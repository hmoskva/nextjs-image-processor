/* eslint-disable import/prefer-default-export */
import { Image } from "entities/image.entity";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.TYPEORM_HOST,
  port: 5432,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  logging: true,
  entities: [Image],
  subscribers: [],
  migrations: [`migrations/*.{ts,js}`],
  autoLoadEntities: true,
});

export let db;

export const initDb = async () => {
  if (!db) {
    db = await AppDataSource.initialize();
  }
};
