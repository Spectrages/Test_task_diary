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
import { SingleDeedDto } from "./deed.dto";
import { ObjectID } from "typeorm";

export class UserSessionDto extends UUIDDto {
  @ApiProperty({
    description: "User email",
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

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

  deeds: ObjectID[];

  friends: ObjectID[];

  public static fromEntity(entity: UsersEntity) {
    return {
      _id: entity._id,
      email: entity.email,
      tag: entity.tag,
      rating: entity.rating,
      deeds: entity.deeds,
      friends: entity.friends,
      created: entity.created.valueOf(),
      updated: entity.updated.valueOf(),
    };
  }

  public static fromJwt(dto: UserSessionDto): UserSessionDto {
    if (!dto) {
      return;
    }

    const outputDto = new UserSessionDto();
    outputDto._id = dto._id;
    outputDto.email = dto.email;
    outputDto.tag = dto.tag;
    outputDto.rating = dto.rating;
    outputDto.deeds = dto.deeds;
    outputDto.friends = dto.friends;
    outputDto.created = dto.created.valueOf();
    outputDto.updated = dto.updated.valueOf();
    return dto;
  }
}
