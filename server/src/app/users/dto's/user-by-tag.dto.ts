// ========================== validator ==================================
import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsNumber,
} from "class-validator";

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

  public static fromEntity(entity: UsersEntity) {
    return {
      _id: entity._id,
      tag: entity.tag,
      rating: entity.rating,
      created: entity.created.valueOf(),
      updated: entity.updated.valueOf(),
    };
  }
}
