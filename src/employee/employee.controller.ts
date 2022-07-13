import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

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
  findAll(): Promise<Employee[]> {
    try {
      return this.employeeService.findAll();
    } catch (e) {
      console.log(e);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Employee> {
    try {
      return this.employeeService.findOne(id);
    } catch (e) {
      console.log(e);
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    try {
      return this.employeeService.update(id, updateEmployeeDto);
    } catch (e) {
      console.log(e);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.employeeService.remove(id);
    } catch (e) {
      console.log(e);
    }
  }
}
