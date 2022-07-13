import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Employee, EmployeeEntity} from "./entities/employee.entity";

@Module({
  imports:[MongooseModule.forFeature([{ name: Employee.name, schema: EmployeeEntity }])],
  controllers: [EmployeeController],
  providers: [EmployeeService]
})
export class EmployeeModule {}
