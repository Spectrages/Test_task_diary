// ========================== validator ========================
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

// ========================== dto ==========================

// ========================== swagger ==========================
import { ApiProperty } from "@nestjs/swagger";

export class UserSignUpDto {
  @ApiProperty({
    example: "test@test.com",
    description: "Email",
    required: true,
  })
  @IsEmail(undefined, { message: "Incorrect email" })
  @IsNotEmpty()
  readonly email!: string;

  @ApiProperty({
    example: "12345qwe678ad9",
    description: "Password",
    required: true,
  })
  @IsNotEmpty()
  @Length(6, 16, { message: "Incorrect length, min 6, max 16" })
  readonly password!: string;

  @ApiProperty({
    description: "User firstname",
  })
  @IsNotEmpty()
  @IsString()
  readonly firstname!: string;

  @ApiProperty({
    description: "User middlename",
  })
  @IsString()
  readonly middlename?: string;

  @ApiProperty({
    description: "User lastname",
  })
  @IsNotEmpty()
  @IsString()
  readonly lastname!: string;

  @ApiProperty({
    example: "CoolMan",
    description: "Unique tag",
    required: true,
  })
  @IsString()
  readonly tag!: string;
}
