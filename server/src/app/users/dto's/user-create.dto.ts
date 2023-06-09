// ========================== swagger ====================================
import { ApiProperty } from "@nestjs/swagger";

// ========================== validator ==================================
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsNumber,
  Length,
} from "class-validator";

// ========================== entitites ===================================
import { SingleDeedEntity } from "../entities/single-deed.entity";
import { ObjectID } from "typeorm";

export class UserCreateDto {
  @ApiProperty({
    description: "User email",
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email!: string;

  @ApiProperty({
    description: "User password",
  })
  @IsNotEmpty()
  @IsString()
  @Length(6, 16, { message: "Uncorrect length, min 6, max 16" })
  password!: string;

  @ApiProperty({
    description: "User firstname",
  })
  @IsNotEmpty()
  @IsString()
  firstname!: string;

  @ApiProperty({
    description: "User middlename",
  })
  @IsString()
  middlename?: string;

  @ApiProperty({
    description: "User lastname",
  })
  @IsNotEmpty()
  @IsString()
  lastname!: string;

  @ApiProperty({
    description: "User tag",
  })
  @IsNotEmpty()
  @IsString()
  tag!: string;

  @ApiProperty({
    description: "User rating",
  })
  @IsNotEmpty()
  @IsNumber()
  rating!: number;

  deeds: ObjectID[];

  friends: string[];
}
