import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import App from "./app";
import { UserController } from "./user/user.controller";
import dbConfig from "./ormconfig";
import validateEnv from "./utils/valideEnv";

validateEnv();

(async () => {
  try {
    await dbConfig.initialize();
  } catch (error) {
    console.log("Error while connecting to the database", error);
    return error;
  }

  const app = new App([
    new UserController(),
  ]);

  app.listen();
})();
