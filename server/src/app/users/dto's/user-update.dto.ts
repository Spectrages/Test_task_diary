// ========================== swagger ====================================
import { ApiProperty } from "@nestjs/swagger";

export class UserUpdateDto {
  @ApiProperty({
    description: "User email",
  })
  email?: string;

  @ApiProperty({
    description: "User password",
  })
  password?: string;

  @ApiProperty({
    description: "User firstname",
  })
  firstname?: string;

  @ApiProperty({
    description: "User middlename",
  })
  middlename?: string;

  @ApiProperty({
    description: "User lastname",
  })
  lastname?: string;

  @ApiProperty({
    description: "User tag",
  })
  tag?: string;
}
