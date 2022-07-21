import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProcessDocument = Process & Document;

@Schema()
export class Process {
  @Prop()
  type: string;

  @Prop()
  status: string;

  @Prop()
  total: number;

  @Prop()
  valid: number;

  @Prop()
  unvalid: number;

  @Prop()
  updated: number;

  @Prop()
  created: number;

  @Prop()
  duplicate: number;

  @Prop()
  startIn: Date;

  @Prop()
  endIn: Date;
}

export const ProcessEntity = SchemaFactory.createForClass(Process);
