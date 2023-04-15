// ============================ typeorm =================================
import { Column, ObjectIdColumn } from "typeorm";

export abstract class IDEntity {
  @ObjectIdColumn()
  _id!: number;

  @Column({
    name: "created",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  created!: Date;

  @Column({
    name: "updated",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updated!: Date;
}
