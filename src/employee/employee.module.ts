import { Logger, Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { ClientsModule } from '@nestjs/microservices';
import {RabbitmqAsyncOptions, RabbitmqCronAsyncOptions} from '../config/rabbitmq.config.service';
import {Employee} from "./entities/employee.entity";
import {employeeProviders} from "./employee.provider";
import {SequelizeModule} from "@nestjs/sequelize";
import {Department} from "../department/entities/department.entity";

@Module({
  imports: [ClientsModule.registerAsync([RabbitmqAsyncOptions, RabbitmqCronAsyncOptions])],
  controllers: [EmployeeController],
  providers: [EmployeeService, Logger],
})
export class EmployeeModule {}
