import {Department} from "../../department/entities/department.entity";

export class CreateEmployeeDto {
    name: string;
    age: number;
    email: string;
    position: string;
    department: Department
}
