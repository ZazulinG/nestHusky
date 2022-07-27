import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type DepartmentDocument = Department & Document;

@Schema()
export class Department {
  @ApiProperty()
  @Prop({ required: true, unique: true })
  name: string;

  @ApiProperty()
  @Prop()
  description: string;
}

export const DepartmentEntity = SchemaFactory.createForClass(Department);
