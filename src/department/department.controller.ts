import {Controller, Get, Post, Body, Patch, Param, Delete, Put} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import {Department} from "./entities/department.entity";
import {ObjectId} from "mongoose";

@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    try {
      return this.departmentService.create(createDepartmentDto);
    }catch (e) {
      console.log(e)
    }
  }

  @Get()
  findAll() {
    try {
      return this.departmentService.findAll();
    }catch (e) {
      console.log(e)
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.departmentService.findOne(id);
    }catch (e) {
      console.log(e)
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto) {
    try {
      return this.departmentService.update(id, updateDepartmentDto);
    }catch (e) {
      console.log(e)
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.departmentService.remove(id);
    }catch (e) {
      console.log(e)
    }
  }

  @Put(':idDep/employees/:id')
  deleteEmpFromDepartment(@Param('id') idEmp: string, @Param('idDep') idDep: string){
    try {
      return this.departmentService.deleteEmployeeFromDepartment(idEmp, idDep)
    }catch (e) {
      console.log(e)
    }
  }
}
