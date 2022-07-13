import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Department, DepartmentEntity } from './entities/department.entity';
import { Employee, EmployeeEntity } from '../employee/entities/employee.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Department.name, schema: DepartmentEntity },
      { name: Employee.name, schema: EmployeeEntity },
    ]),
  ],
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class DepartmentModule {}
