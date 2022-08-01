import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {Column, Model, Table} from "sequelize-typescript";

export type DepartmentDocument = Department & Document;

@Schema()
@Table
export class Department extends Model{
  @ApiProperty()
  @Column
  @Prop({ required: true, unique: true })
  name: string;

  @ApiProperty()
  @Column
  @Prop()
  description: string;
}

export const DepartmentEntity = SchemaFactory.createForClass(Department);
