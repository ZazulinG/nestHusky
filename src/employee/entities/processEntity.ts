import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProcessDocument = Process & Document;

@Schema()
export class Process {
  @Prop()
  type: string;

  @Prop({default: 'in progress'})
  status: string;

  @Prop({default: 0})
  total: number;

  @Prop({default: 0})
  valid: number;

  @Prop({default: 0})
  unvalid: number;

  @Prop({default: 0})
  updated: number;

  @Prop({default: 0})
  created: number;

  @Prop({default: 0})
  duplicate: number;

  @Prop({default: new Date()})
  startIn: Date;

  @Prop({default: null})
  endIn: Date;
}

export const ProcessEntity = SchemaFactory.createForClass(Process);
