import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { ProcessController } from './process.controller';
import {
  RabbitmqAsyncOptions,
} from '../config/rabbitmq.config.service';

@Module({
  imports: [ClientsModule.registerAsync([RabbitmqAsyncOptions])],
  controllers: [ProcessController],
})
export class ProcessModule {}
