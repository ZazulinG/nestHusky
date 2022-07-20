import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DepartmentModule } from './department/department.module';
import { EmployeeModule } from './employee/employee.module';
import { ProcessController } from './process/process.controller';
import {ProcessModule} from "./process/process.module";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    DepartmentModule,
    EmployeeModule,
      ProcessModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
