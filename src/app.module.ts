import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DepartmentModule } from './department/department.module';
import { EmployeeModule } from './employee/employee.module';
import { ProcessModule } from './process/process.module';
import { MongoWrapperService } from './mongo-wrapper/mongo-wrapper.service';
import {MongoWrapperModule} from "./mongo-wrapper/mongo-wrapper.module";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    DepartmentModule,
    EmployeeModule,
    ProcessModule,
      MongoWrapperModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
