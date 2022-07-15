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

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    try {
      return this.employeeService.create(createEmployeeDto);
    } catch (e) {
      console.log(e);
    }
  }

  @Get()
  async findAll(): Promise<Employee[]> {
    try {
      return await this.employeeService.findAll();
    } catch (e) {
      console.log(e);
    }
  }

  @Get('dump')
  async dump(@Res() res: Response) {
    try {
      const csvData = await this.employeeService.getDump();
      res.writeHead(200,{'Content-Type': 'text/csv',
        'Content-Disposition':'filename="test.csv"'});
      res.write(csvData)
      res.end()
    } catch (e) {
      console.log(e);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Employee> {
    try {
      return await this.employeeService.findOne(id);
    } catch (e) {
      console.log(e);
    }
  }

  @Post('importdb/:mode')
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
  async remove(@Param('id') id: string) {
    try {
      return await this.employeeService.remove(id);
    } catch (e) {
      console.log(e);
    }
  }
}
