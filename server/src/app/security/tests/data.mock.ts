// ========================== entity ==========================

import { ObjectID } from "typeorm";
import { UsersEntity } from "../../users/entities/users.entity";

const date = new Date();

export const usersEntity = new UsersEntity();
usersEntity._id =
  "94ff2989-7ffa-4c2a-bfae-5fa78a751fd5" as unknown as ObjectID;
usersEntity.created = date;
usersEntity.updated = date;
usersEntity.email = "test@test.com";
usersEntity.tag = "unique";
usersEntity.friends = [];
usersEntity.deeds = [];
usersEntity.rating = 0;
