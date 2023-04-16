// ========================== swagger ====================================
import { ApiProperty } from "@nestjs/swagger";
import { ObjectID } from "typeorm";

export abstract class IDDto {
  @ApiProperty({
    description: "Entry id",
  })
  _id!: ObjectID;

  @ApiProperty({
    description: "Date created",
  })
  created!: number;

  @ApiProperty({
    description: "Date updated",
  })
  updated!: number;
}
