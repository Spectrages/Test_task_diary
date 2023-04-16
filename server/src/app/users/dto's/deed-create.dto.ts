// ========================== swagger ====================================
import { ApiProperty } from "@nestjs/swagger";

// ========================== validator ==================================
import { IsNotEmpty, IsString } from "class-validator";
import { UUIDDto } from "../../../shared/dtos/uuid.dto";

export class CreateSingleDeedDto extends UUIDDto {
  @ApiProperty({
    example: "Name",
    description: "Deed name",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: "Description",
    description: "Deed description",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
