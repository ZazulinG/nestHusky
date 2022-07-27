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
    EmployeeModule,
    ProcessModule,
    MongoWrapperModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
