// ========================== swagger ====================================
import { ApiProperty } from "@nestjs/swagger";

// ========================== validator ==================================
import { IsNotEmpty, IsString } from "class-validator";

export class SingleDeedDto {
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
