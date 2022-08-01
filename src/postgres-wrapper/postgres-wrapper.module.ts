import {Logger, Module} from "@nestjs/common";
import {Sequelize} from "sequelize-typescript";
import {SequelizeModule} from "@nestjs/sequelize";
import {Employee} from "../employee/entities/employee.entity";
import {employeeProviders} from "../employee/employee.provider";
import {Department} from "../department/entities/department.entity";

@Module({
    imports: [],
    providers: [Logger],
})
export class PostgresWrapperModule {}