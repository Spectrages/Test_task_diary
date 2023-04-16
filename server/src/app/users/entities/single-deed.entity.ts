// ========================== typeorm ===================================
import { Column, Entity, Index } from "typeorm";

// ========================== entities ==================================
import { UUIDEntity } from "../../../shared/entities/uuid.entity";

// ========================== swagger ====================================
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "single deed" })

export class SingleDeedEntity extends UUIDEntity {
  @ApiProperty({
    example: "Name",
    description: "Deed name",
    required: true,
  })
  @Index()
  @Column({ name: "name" })
  name: string;

  @ApiProperty({
    example: "Description",
    description: "Deed description",
    required: true,
  })
  @Index()
  @Column({ name: "description" })
  description: string;
}
