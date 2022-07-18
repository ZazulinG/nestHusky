import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Employee, EmployeeDocument } from './entities/employee.entity';
import { Model } from 'mongoose';
import { validate } from '../helper/helper';
import FileHelper from '../helper/FileHelper';
import {
  Department,
  DepartmentDocument,
} from '../department/entities/department.entity';
import csv from 'csvtojson';
import { ClientProxy } from '@nestjs/microservices';
import * as fs from 'fs';
import { Readable } from 'stream';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
    @InjectModel(Department.name)
    private departmentModel: Model<DepartmentDocument>,
    @Inject('SERVICE') private readonly client: ClientProxy,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    return await this.employeeModel.create(createEmployeeDto);
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeModel.find();
  }

  async findOne(id: string): Promise<Employee> {
    if (!validate(id)) throw new NotFoundException();
    const emp = await this.employeeModel
      .findOne({ _id: id })
      .populate('department');
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

  async remove(id: string) {
    if (!validate(id)) throw new NotFoundException();
    const empDeleted = await this.employeeModel.deleteOne({ _id: id });
    if (empDeleted.deletedCount) {
      return 'success deleted';
    }
    throw new NotFoundException();
  }

  async getDump() {
    const employees = await this.employeeModel.find().select('-__v');
    return await FileHelper.dump(employees);
  }

  async readCsvFile(fileData, mode) {
    if (mode === 'update') {
      // const stream =  await csv({}).fromString(String(fileData.buffer)).subscribe((item, lineNumber) => {
      //   console.log(111)
      //   if (!item.department) item.department = null;
      //   if (
      //       validate(item._id) &&
      //       (validate(item.department) || !item.department)
      //   ) {
      //     const id = item._id;
      //     delete item._id;
      //     this.client.emit('updateEmp', {id, item})
      //   }
      // }).on('end', ()=>{
      //   console.log('файл закрыт')})

      const rstream = Readable.from(fileData.buffer.toString());
      rstream.on('data', (chunk) => {
        console.log(chunk);
      });
      const wstream = fs.createWriteStream('test.txt');
      rstream.pipe(csv()).pipe(wstream);

      return 'success';
    } else if (mode === 'create') {
      // const stream = await csv({})
      //   .fromString(String(fileData.buffer))
      //   .subscribe((item, lineNumber) => {
      //     if (!item.department) item.department = null;
      //     if (validate(item.department) || !item.department) {
      //       this.client.emit('createEmp', item);
      //     }
      //   });
      return 'success';
    }
  }
}
