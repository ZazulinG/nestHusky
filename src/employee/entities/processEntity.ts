import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ProcessDocument = Process & Document;

@Schema()
export class Process {
  @ApiProperty({ description: 'Type of process' })
  @Prop()
  type: string;

  @ApiProperty({ description: 'Status of process' })
  @Prop({ default: 'in progress' })
  status: string;

  @ApiProperty({ description: 'Amount entry' })
  @Prop({ default: 0 })
  total: number;

  @ApiProperty({ description: 'Amount valid entry' })
  @Prop({ default: 0 })
  valid: number;

  @ApiProperty({ description: 'Amount unvalid entry' })
  @Prop({ default: 0 })
  unvalid: number;

  @ApiProperty({ description: 'Amount updated entry' })
  @Prop({ default: 0 })
  updated: number;

  @ApiProperty({ description: 'Amount created entry' })
  @Prop({ default: 0 })
  created: number;

  @ApiProperty({ description: 'Amount dublicate' })
  @Prop({ default: 0 })
  duplicate: number;

  @ApiProperty({ description: 'Date of start' })
  @Prop({ default: new Date() })
  startIn: Date;

  @ApiProperty({ description: 'Date of end' })
  @Prop({ default: null })
  endIn: Date;
}

export const ProcessEntity = SchemaFactory.createForClass(Process);
