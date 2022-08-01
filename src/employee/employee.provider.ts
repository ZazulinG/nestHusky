import {Employee} from "./entities/employee.entity";

export const employeeProviders = [
    {
        provide: 'EMPLOYEE_REPOSITORY',
        useValue: Employee,
    }]