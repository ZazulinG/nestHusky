import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { faker } from '@faker-js/faker';
import {
  ApiAcceptedResponse,
  ApiBody,
  ApiCreatedResponse, ApiExcludeEndpoint, ApiNotFoundResponse, ApiOkResponse,
  ApiOperation,
  ApiTags
} from "@nestjs/swagger";
import {MongoWrapperService} from "../mongo-wrapper/mongo-wrapper.service";

@ApiTags('Employees')
@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService,
              private readonly mongoWr: MongoWrapperService) {}

  @Post()
  @ApiOperation({summary: 'Create employee'})
  @ApiCreatedResponse({type: Employee})
  @ApiBody({type: CreateEmployeeDto})
  create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    try {
      return this.employeeService.create(createEmployeeDto);
    } catch (e) {
      console.log(e);
    }
  }

  @Get()
  @ApiOperation({summary: 'All employees'})
  @ApiOkResponse({type: [Employee]})
  async findAll() {
    try {
      return await this.mongoWr.find('employees')
      return await this.employeeService.findAll();
    } catch (e) {
      console.log(e);
    }
  }

  @Get('dump')
  @ApiOperation({summary: 'Dump bd Employees'})
  @ApiAcceptedResponse({description: 'Dump bd Employees'})
  async dump(@Res() res: Response) {
    try {
      const csvData = await this.employeeService.getDump();
      res.writeHead(200, {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'filename="test.csv"',
      });
      res.write(csvData);
      res.end();
    } catch (e) {
      console.log(e);
    }
  }

  @Get(':id')
  @ApiOperation({summary: 'Info about employee'})
  @ApiOkResponse({description: 'Employee', type: Employee})
  @ApiNotFoundResponse({description: 'Not found'})
  async findOne(@Param('id') id: string): Promise<Employee> {
    try {
      return await this.employeeService.findOne(id);
    } catch (e) {
      console.log(e);
    }
  }

  @Post('importdb/:mode')
  @ApiOperation({summary: 'Updated data base employees'})
  @UseInterceptors(FileInterceptor('file'))
  async importDatabaseCreate(
    @Param('mode') mode,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      return await this.employeeService.readCsvFile(file, mode);
    } catch (e) {
      console.log(e);
    }
  }

  @Patch(':id')
  @ApiOperation({summary: 'update employee'})
  @ApiBody({type: UpdateEmployeeDto})
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    try {
      return await this.employeeService.update(id, updateEmployeeDto);
    } catch (e) {
      console.log(e);
    }
  }

  @Delete(':id')
  @ApiOperation({summary: 'Remove employee'})
  @ApiOkResponse({description: 'success deleted'})
  async remove(@Param('id') id: string) {
    try {
      return await this.employeeService.remove(id);
    } catch (e) {
      console.log(e);
    }
  }

  @ApiExcludeEndpoint()
  @Post('testfaker')
  async fake() {
    try {
      const ws = fs.createWriteStream('test.txt');
      let i = 0;
      while (i < 200000) {
        ws.write(
          `"${faker.name.findName()}","${faker.random.numeric(
            2,
          )}","${faker.internet.exampleEmail()}","${faker.random.alpha(4)}",\n`,
        );
        i++;
      }
      return 'good';
    } catch (e) {
      console.log(e);
    }
  }


}
