import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Department app')
  .setDescription('Department app API description')
  .setVersion('1.0')
  .build();
