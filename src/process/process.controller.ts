import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiFoundResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Process } from '../employee/entities/processEntity';

@ApiTags('Process')
@Controller('process')
export class ProcessController {
  constructor(@Inject('SERVICE') private readonly client: ClientProxy) {}

  @Get(':id')
  @ApiOperation({ summary: 'Info about process' })
  @ApiParam({ name: 'processId', required: true, description: 'process ID' })
  @ApiFoundResponse({ type: Process })
  @ApiNotFoundResponse({ description: 'Not found' })
  getInfoProcess(@Param('id') id) {
    try {
      return this.client.send('getInfoProcess', id);
    } catch (e) {
      console.log(e);
    }
  }
}
