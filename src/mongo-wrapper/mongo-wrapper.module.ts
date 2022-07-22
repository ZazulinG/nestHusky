import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {DepartmentModule} from "../department/department.module";
import {EmployeeModule} from "../employee/employee.module";
import {ProcessModule} from "../process/process.module";
import {AppController} from "../app.controller";
import {AppService} from "../app.service";
import {MongoWrapperService} from "./mongo-wrapper.service";
import {Mongoose} from "mongoose";
import {Employee, EmployeeEntity} from "../employee/entities/employee.entity";
import {Department, DepartmentEntity} from "../department/entities/department.entity";
import {Process, ProcessEntity} from "../employee/entities/processEntity";

@Module({
    imports:[MongooseModule.forFeature([
        { name: Employee.name, schema: EmployeeEntity },
        { name: Department.name, schema: DepartmentEntity },
        { name: Process.name, schema: ProcessEntity },])
    ],
    providers: [MongoWrapperService],
})
export class MongoWrapperModule {}