// ========================== typeorm ===================================
import { Column, Entity, Index, ObjectID } from "typeorm";

// ========================== entities & dto's ==================================
import { UUIDEntity } from "../../../shared/entities/uuid.entity";

// ========================== swagger ====================================
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "users" })
export class UsersEntity extends UUIDEntity {
  @ApiProperty({
    example: "test@test.com",
    description: "Email",
    required: true,
  })
  @Index()
  @Column({ name: "email" })
  email!: string;

  @ApiProperty({
    example: "123123",
    description: "Password",
    required: true,
  })
  @Index()
  @Column({ name: "password" })
  password!: string;

  @ApiProperty({
    example: "John",
    description: "Firstname",
    required: true,
  })
  @Column({ name: "firstname" })
  firstname!: string;

  @ApiProperty({
    example: "Aaron",
    description: "Middlename",
    required: false,
  })
  @Index()
  @Column({ name: "middlename" })
  middlename?: string;

  @ApiProperty({
    example: "Bennett",
    description: "Lastname",
    required: true,
  })
  @Index()
  @Column({ name: "lastname" })
  lastname!: string;

  @ApiProperty({
    example: "CoolMan",
    description: "Unique tag",
    required: true,
  })
  @Index()
  @Column({ name: "tag" })
  tag!: string;

  @ApiProperty({
    example: "100",
    description: "Good deed rating",
    required: true,
  })
  @Index()
  @Column({ name: "rating" })
  rating!: number;

  @Column({ name: "deeds" })
  deeds!: ObjectID[];

  @Column({ name: "friends" })
  friends!: string[];
}
