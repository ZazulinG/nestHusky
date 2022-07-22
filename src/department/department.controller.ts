import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put, NotFoundException,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';
import {ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {Employee} from "../employee/entities/employee.entity";
import {UpdateEmployeeDto} from "../employee/dto/update-employee.dto";



@ApiTags('Departments')
@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  @ApiOperation({summary: 'Create department'})
  @ApiCreatedResponse({type: Department})
  @ApiBody({type: CreateDepartmentDto})
  create(
    @Body() createDepartmentDto: CreateDepartmentDto,
  ): Promise<Department> {
    try {
      return this.departmentService.create(createDepartmentDto);
    } catch (e) {
      console.log(e);
    }
  }

  @Get()
  @ApiOperation({summary: 'All departments'})
  @ApiOkResponse({type: [Department]})
  findAll() {
    try {
      return this.departmentService.findAll();
    } catch (e) {
      console.log(e);
    }
  }

  @Get(':id')
  @ApiOperation({summary: 'Info about department'})
  @ApiOkResponse({description: 'Department', type: Department})
  @ApiNotFoundResponse({description: 'Not found'})
  async findOne(@Param('id') id: string) {
    try {
      return await this.departmentService.findOne(id);
    } catch (e) {
      console.log(e);
    }
  }

  @Patch(':id')
  @ApiOperation({summary: 'Update department'})
  @ApiBody({type: UpdateDepartmentDto})
  update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    try {
      return this.departmentService.update(id, updateDepartmentDto);
    } catch (e) {
      console.log(e);
    }
  }

  @Delete(':id')
  @ApiOperation({summary: 'Remove department'})
  @ApiOkResponse({description: 'success deleted'})
  remove(@Param('id') id: string) {
    try {
      return this.departmentService.remove(id);
    } catch (e) {
      console.log(e);
    }
  }

  @Put(':idDep/employees/:idEmp')
  @ApiOperation({summary: 'Remove employee from department'})
  @ApiOkResponse({description: 'success deleted'})
  deleteEmpFromDepartment(
    @Param('idEmp') idEmp: string,
    @Param('idDep') idDep: string,
  ) {
    try {
      return this.departmentService.deleteEmployeeFromDepartment(idEmp, idDep);
    } catch (e) {
      console.log(e);
    }
  }
}
