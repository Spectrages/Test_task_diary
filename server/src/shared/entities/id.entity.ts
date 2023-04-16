// ============================ typeorm =================================
import { Column, ObjectIdColumn } from "typeorm";
import { ObjectID } from "mongodb";

export abstract class IDEntity {
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
