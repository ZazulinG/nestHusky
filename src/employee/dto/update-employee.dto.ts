import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';
import {ApiProperty} from "@nestjs/swagger";
import {Department} from "../../department/entities/department.entity";

export class UpdateEmployeeDto  {
  @ApiProperty()
  name: string;
  @ApiProperty()
  age: number;
  @ApiProperty()
  email: string;
  @ApiProperty()
  position: string;
  @ApiProperty()
  department: Department;
}
