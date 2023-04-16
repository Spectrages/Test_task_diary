// ============================ typeorm =================================
import { Column, ObjectID, ObjectIdColumn } from "typeorm";

export abstract class UUIDEntity {
  @ObjectIdColumn()
  _id!: ObjectID;

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
