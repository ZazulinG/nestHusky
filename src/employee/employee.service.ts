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
import {filter} from "rxjs";

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
    if(!validate(id)) throw new NotFoundException();
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
    if(!validate(id)) throw new NotFoundException();
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
    if(!validate(id)) throw new NotFoundException();
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
    const json = await csv({}).fromString(String(fileData.buffer));
    if (mode === 'update') {
      let handledItems = json.reduce((objectValues, item) =>{
        if (!item.department) item.department = null;
        if(validate(item._id) && (validate(item.department) || !item.department)){
          const id = item._id;
          delete item._id;
          objectValues.queryForBulk.push({
            updateOne: {
              filter: { _id: id },
              update: {$set: item}
            }
          })
        }else {
          objectValues.unvalidItems.push(item)
          }
        return objectValues
      }, {unvalidItems: [], queryForBulk: []})
      await this.employeeModel.bulkWrite(handledItems.queryForBulk)
      return {'Updated': handledItems.queryForBulk.length, 'Unvalid': handledItems.unvalidItems.length}
    } else if (mode === 'create') {
      let handledItems = json.reduce((objectValues, item) => {
        if (!item.department) item.department = null;
        if(validate(item.department) || !item.department){
          objectValues.validItems.push(item)
        }else {
          objectValues.unvalidItems.push(item)
        }
        return objectValues
      }, {validItems:[], unvalidItems:[]})
      await this.employeeModel.insertMany(handledItems.validItems)
      return {'Created': handledItems.validItems.length, 'Unvalid': handledItems.unvalidItems.length}
    }
  }
}
