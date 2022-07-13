import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";

export type DepartmentDocument = Department & Document

@Schema()
export class Department {
    @Prop({required: true, unique: true})
    name: string;

    @Prop()
    description: string;

}

export const DepartmentEntity = SchemaFactory.createForClass(Department);
