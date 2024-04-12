import { DataSource, DataSourceOptions } from "typeorm";
import User from "./user/user.entity";
import dotenv from 'dotenv'

dotenv.config()

const dbConfig = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User],
  migrations: ["dist/migrations/*{.ts,.js}"],
  migrationsTableName: "api_migrations",
  synchronize: false,
  logging: ["error"],
});

export = dbConfig;
