import "dotenv/config";
import { MongoConnectionOptions } from "typeorm/driver/mongodb/MongoConnectionOptions";

// ========================== entities ==========================

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
  entities: [],
  migrations: [],
};

export default databaseConfig;
