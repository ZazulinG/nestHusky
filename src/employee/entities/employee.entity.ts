import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Department } from '../../department/entities/department.entity';

export type EmployeeDocument = Employee & Document;


@Schema()
export class Employee  {

  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  age: number;

  @ApiProperty()
  @Prop()
  email: string;

  @ApiProperty()
  @Prop()
  position: string;

  @ApiProperty({ type: Department })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Department' })
  department: Department;

}

export const EmployeeEntity = SchemaFactory.createForClass(Employee);
