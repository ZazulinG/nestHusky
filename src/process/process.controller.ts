import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('process')
export class ProcessController {
  constructor(@Inject('SERVICE') private readonly client: ClientProxy) {}
  @Get(':id')
  getInfoProcess(@Param('id') id) {
    try {
      return this.client.send('getInfoProcess', id);
    } catch (e) {
      console.log(e);
    }
  }
}
