import {
  ClientProvider,
  ClientsModuleOptionsFactory,
  Transport,
} from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

export class RabbitmqConfigService implements ClientsModuleOptionsFactory {
  configService = new ConfigService();
  createClientOptions(): Promise<ClientProvider> | ClientProvider {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [`${this.configService.get('RABBITMQ_URL')}`],
        queue: this.configService.get('RABBITMQ_NAME'),
        queueOptions: {
          durable: false,
        },
      },
    };
  }
}

export const RabbitmqAsyncOptions = {
  name: 'SERVICE',
  useClass: RabbitmqConfigService,
};

export class RabbitmqCronConfigService implements ClientsModuleOptionsFactory {
  configService = new ConfigService();
  createClientOptions(): Promise<ClientProvider> | ClientProvider {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [`${this.configService.get('RABBITMQ_CRON_URL')}`],
        queue: this.configService.get('RABBITMQ_CRON_NAME'),
        queueOptions: {
          durable: false,
        },
      },
    };
  }
}

export const RabbitmqCronAsyncOptions = {
  name: 'SERVICE_CRON',
  useClass: RabbitmqCronConfigService,
};