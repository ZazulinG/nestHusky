import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Employee} from "../employee/entities/employee.entity";
import {Model} from "mongoose";
import {Department} from "../department/entities/department.entity";
import {Process} from "../employee/entities/processEntity";

@Injectable()
export class MongoWrapperService {
    @InjectModel(Process.name) private processModel: Model<Process>
    constructor(@InjectModel(Employee.name) private employeeModel: Model<Employee>,
                @InjectModel(Department.name) private departmentModel: Model<Department>) {}

    find(collection){
        switch (collection) {
            case ('employees'): {
                return this.employeeModel.find()
            }
            case ('departments'):{
                return this.departmentModel.find()
            }
            case ('process'):{
                return this.processModel.find()
            }
        }
        return '321321321'
    }
}
