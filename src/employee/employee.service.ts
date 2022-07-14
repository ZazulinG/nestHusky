import { Injectable, NotFoundException } from '@nestjs/common';
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

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
    @InjectModel(Department.name)
    private departmentModel: Model<DepartmentDocument>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    return await this.employeeModel.create(createEmployeeDto);
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeModel.find();
  }

  async findOne(id: string): Promise<Employee> {
    validate(id);
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
    validate(id);
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
    validate(id);
    const empDeleted = await this.employeeModel.deleteOne({ _id: id });
    if (empDeleted.deletedCount) {
      return 'success deleted';
    }
    throw new NotFoundException();
  }

  async getDump() {
    const employees = await this.employeeModel.find().select('-__v');
    await FileHelper.dump(employees, 'employees');
  }

  async readCsvFile(fileData, mode) {
    const json = await csv({}).fromString(String(fileData.buffer));
    if (mode === 'update') {
      json.map(async (item) => {
        const id = item._id;
        delete item._id;
        if (item.department === 'null') {
          item.department = null;
        }
        await this.employeeModel.updateOne({ _id: id }, item);
      });
      return 'Записи успешно обновлены';
    } else if (mode === 'create') {
      json.map(async (item) => {
        if (item.department === 'null') {
          item.department = null;
        }
        await this.employeeModel.create(item);
      });
      return 'Записи успешно созданы';
    }
  }
}
