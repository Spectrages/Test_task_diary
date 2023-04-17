import "dotenv/config";
import { MongoConnectionOptions } from "typeorm/driver/mongodb/MongoConnectionOptions";

// ========================== entities ==========================
import { UsersEntity } from "../app/users/entities/users.entity";
import { SingleDeedEntity } from "../app/users/entities/single-deed.entity";

// ========================== migrations ==========================

const databaseConfig: MongoConnectionOptions = {
  type: "mongodb",
  host: "localhost",
  port: 27017,
  username: null,
  password: null,
  database: "test",
  useUnifiedTopology: true,
  useNewUrlParser: true,
  synchronize: false,
  entities: [UsersEntity, SingleDeedEntity],
  migrations: [],
};

export default databaseConfig;
