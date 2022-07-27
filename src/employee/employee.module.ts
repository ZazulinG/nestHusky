import { Logger, Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { ClientsModule } from '@nestjs/microservices';
import {
  RabbitmqAsyncOptions,
} from '../config/rabbitmq.config.service';

@Module({
  imports: [ClientsModule.registerAsync([RabbitmqAsyncOptions])],
  controllers: [EmployeeController],
  providers: [EmployeeService, Logger],
})
export class EmployeeModule {}
