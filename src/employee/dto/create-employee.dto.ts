import { Department } from '../../department/entities/department.entity';
import {ApiProperty} from "@nestjs/swagger";

export class CreateEmployeeDto {
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
