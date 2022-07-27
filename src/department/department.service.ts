import {
  HttpException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { validate } from '../helper/helper';
import { DBFactory } from '../mongo-wrapper/mongo-wrapper.service';
import { Department, DepartmentEntity } from './entities/department.entity';
import { EmployeeEntity } from '../employee/entities/employee.entity';

@Injectable()
export class DepartmentService {
  departmentModel = DBFactory.getModel('Department', DepartmentEntity);
  employeeModel = DBFactory.getModel('Employee', EmployeeEntity);

  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    const department = await this.departmentModel.findOne({
      name: createDepartmentDto.name,
    });
    if (department) {
      throw new HttpException('Уже существует', 400);
    }
    return this.departmentModel.create(createDepartmentDto);
  }

  async findAll(): Promise<Department[]> {
    return this.departmentModel.find();
  }

  async findOne(id: string): Promise<Department> {
    if (!validate(id)) throw new NotFoundException();
    const department = await this.departmentModel.findOne({ _id: id });
    if (department) {
      return department;
    }
    throw new NotFoundException();
  }

  async update(
    id: string,
    updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<Department> {
    if (!validate(id)) throw new NotFoundException();
    const department = await this.departmentModel.findOne({ _id: id });
    if (department) {
      return this.departmentModel.findOneAndUpdate(
        { _id: id },
        updateDepartmentDto,
        { new: true },
      );
    }
    throw new NotFoundException();
  }

  async remove(id: string): Promise<string> {
    if (!validate(id)) throw new NotFoundException();
    const emp = this.employeeModel.findOne({ department: id });
    if (emp) {
      throw new NotAcceptableException('employees in the department');
    }
    const deletedDepartment = await this.departmentModel.deleteOne({ _id: id });
    if (deletedDepartment.deletedCount) {
      return 'success deleted';
    }
    throw new NotFoundException();
  }

  async deleteEmployeeFromDepartment(
    idEmp: string,
    idDep: string,
  ): Promise<string> {
    if (!validate(idEmp) || !validate(idDep)) throw new NotFoundException();
    const emp = await this.employeeModel.findOne({
      _id: idEmp,
      department: idDep,
    });
    if (emp) {
      await this.employeeModel.updateOne(
        { _id: idEmp },
        { $set: { department: null } },
      );
      return 'success deleted from department';
    }
    throw new NotFoundException();
  }
}
