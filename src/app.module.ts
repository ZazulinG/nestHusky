import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DepartmentModule } from './department/department.module';
import { EmployeeModule } from './employee/employee.module';
import { ProcessModule } from './process/process.module';
import { MongoWrapperModule } from './mongo-wrapper/mongo-wrapper.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseConfigService } from './config/mongoose.config.service';
import { WinstonModule } from 'nest-winston';
import { WinstonConfigService } from './config/winston.config.service';
import {ScheduleModule} from "@nestjs/schedule";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PostgresWrapperModule} from "./postgres-wrapper/postgres-wrapper.module";
import {SequelizeModule} from "@nestjs/sequelize";
import {Employee} from "./employee/entities/employee.entity";
import {Department} from "./department/entities/department.entity";

@Module({
  imports: [
    WinstonModule.forRootAsync({
      useClass: WinstonConfigService,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    DepartmentModule,
    ScheduleModule.forRoot(),
    EmployeeModule,
    ProcessModule,
    MongoWrapperModule,
    PostgresWrapperModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
