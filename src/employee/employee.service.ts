import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { validate } from '../helper/helper';
import FileHelper from '../helper/FileHelper';
import csv from 'csvtojson';
import { ClientProxy } from '@nestjs/microservices';
import { ReadStream } from 'fs';
import { ProcessEntity } from './entities/processEntity';
import { DBFactory } from '../mongo-wrapper/mongo-wrapper.service';
import { Employee, EmployeeEntity } from './entities/employee.entity';
import { UpdateEmployeeDto } from './dto/update-employee.dto';



@Injectable()
export class EmployeeService {
  private employeeModel = DBFactory.getModel('Employee', EmployeeEntity);
  private processModel = DBFactory.getModel('Process', ProcessEntity);
  constructor(@Inject('SERVICE') private readonly client: ClientProxy,
              @Inject('SERVICE_CRON') private readonly clientCron: ClientProxy) {}

  async create(createEmployeeDto) {
    return this.employeeModel.create(createEmployeeDto);
  }

  async findAll(): Promise<Employee[]> {
    return await this.employeeModel.find();
  }

  async findOne(id: string): Promise<Employee> {
    if (!validate(id)) throw new NotFoundException();
    const emp = await this.employeeModel.findOneWithPopulate(
      { _id: id },
      'department',
    );
    if (emp) {
      return emp;
    }
    throw new NotFoundException();
  }

  async update(
    id: string,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    if (!validate(id)) throw new NotFoundException();
    const updatedEmp = await this.employeeModel.findOne({ _id: id });
    if (updatedEmp) {
      return this.employeeModel.findOneAndUpdate(
        { _id: id },
        updateEmployeeDto,
        { new: true },
      );
    }
    throw new NotFoundException();
  }

  async remove(id: string): Promise<string> {
    if (!validate(id)) throw new NotFoundException();
    const empDeleted = await this.employeeModel.deleteOne({ _id: id });
    if (empDeleted.deletedCount) {
      return 'success deleted';
    }
    throw new NotFoundException();
  }

  async getDump() {
    const employees = await this.employeeModel.findWithSelect({}, '-__v');
    return await FileHelper.dump(employees);
  }

  async readCsvFile(fileData, mode): Promise<string> {
    const currentProcess = await this.processModel.create({ type: mode });
    await this.clientCron.emit('checkProcess', currentProcess)
    let unvalid = 0;
    let total = 0;
    const data = {
      queryForBulk: [],
      currentProcess,
    };
    const readstream = ReadStream.from(fileData.buffer.toString()).pipe(csv());
    readstream.on('data',  (item) => {
      const itemJson = JSON.parse(item);
      total++;
      if (!itemJson.department) itemJson.department = null;
      if (validate(itemJson.department) || !itemJson.department) {
        if (mode === 'update') {
          if (validate(itemJson._id)) {
            const id = itemJson._id;
            delete itemJson._id;
            data.queryForBulk.push({
              updateOne: { filter: { _id: id }, update: itemJson },
            });
          } else {
            unvalid++;
          }
        } else if (mode === 'create') {
          data.queryForBulk.push({
            insertOne: { document: itemJson },
          });
        }
        if (
          data.queryForBulk.length % 1000 === 0 &&
          data.queryForBulk.length
        ) {
          const newData = {
            queryForBulk: [...data.queryForBulk],
            currentProcess,
          };
          this.client.send('updateEmp', newData).subscribe();
          data.queryForBulk = [];
        }
      } else {
        unvalid++;
      }
    });
    readstream.on('end', async () => {
      if (data.queryForBulk.length) {
        this.client.send('updateEmp', data).subscribe();
      }
      await this.processModel.updateOne(
        { _id: currentProcess._id },
        { total, unvalid },
      );
    });
    return 'success start';
  }

}
