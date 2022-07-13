import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, {Document} from "mongoose";
import {Department} from "../../department/entities/department.entity";

export type EmployeeDocument = Employee & Document

@Schema()
export class Employee {
    @Prop()
    name: string;

    @Prop()
    age: number;

    @Prop()
    email: string;

    @Prop()
    position: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Department' })
    department: Department
}

export const EmployeeEntity = SchemaFactory.createForClass(Employee);
