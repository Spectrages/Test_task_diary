// ========================== swagger ====================================
import { ApiProperty } from "@nestjs/swagger";
import { ObjectId } from "mongodb";

export abstract class UUIDDto {
  @ApiProperty({
    description: "Entry id",
  })
  _id!: ObjectId;

  @ApiProperty({
    description: "Date created",
  })
  created!: number;

  @ApiProperty({
    description: "Date updated",
  })
  updated!: number;
}
