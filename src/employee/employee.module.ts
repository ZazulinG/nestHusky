import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeEntity } from './entities/employee.entity';
import {
  Department,
  DepartmentEntity,
} from '../department/entities/department.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Process, ProcessEntity } from './entities/processEntity';
import {MongoWrapperService} from "../mongo-wrapper/mongo-wrapper.service";


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeEntity },
      { name: Department.name, schema: DepartmentEntity },
      { name: Process.name, schema: ProcessEntity },
    ]),
    ClientsModule.register([
      {
        name: 'SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'main_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, MongoWrapperService],
})
export class EmployeeModule {}
