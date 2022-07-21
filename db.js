/* eslint-disable import/prefer-default-export */
import { Image } from "./entities/image.entity";
import { DataSource } from "typeorm";
import { loadEnvConfig } from "@next/env";

loadEnvConfig("./", process.env.NODE_ENV !== "production");

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.TYPEORM_HOST,
  port: 5432,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  logging: true,
  subscribers: [],
  entities: [Image],
  migrations: [`${__dirname}/migrations/*.{ts,js}`],
  autoLoadEntities: true,
});

export let db;

export const initDb = async () => {
  if (!db) {
    db = await AppDataSource.initialize();
  }
};
