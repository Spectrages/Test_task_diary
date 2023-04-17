// ========================== validator ==================================
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

// ========================== entities & dto's ===========================
import { UsersEntity } from "../entities/users.entity";
import { UUIDDto } from "../../../shared/dtos/uuid.dto";

// ========================== swagger ====================================
import { ApiProperty } from "@nestjs/swagger";

export class UserByTagDto extends UUIDDto {
  @ApiProperty({
    description: "User tag",
  })
  @IsNotEmpty()
  @IsString()
  tag?: string;

  @ApiProperty({
    description: "User rating",
  })
  @IsNotEmpty()
  @IsNumber()
  rating?: number;

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

  public static fromEntity(entity: UsersEntity) {
    return {
      _id: entity._id,
      tag: entity.tag,
      firstname: entity.firstname,
      middlename: entity.middlename,
      lastname: entity.lastname,
      rating: entity.rating,
      created: entity.created.valueOf(),
      updated: entity.updated.valueOf(),
    };
  }
}
