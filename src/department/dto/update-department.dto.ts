import { ApiProperty } from '@nestjs/swagger';

export class UpdateDepartmentDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
}
