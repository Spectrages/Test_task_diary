// ============================ typeorm =================================
import { Column, ObjectIdColumn } from "typeorm";
import { ObjectId } from "mongodb";

export abstract class UUIDEntity {
  @ObjectIdColumn()
  _id!: ObjectId;

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
