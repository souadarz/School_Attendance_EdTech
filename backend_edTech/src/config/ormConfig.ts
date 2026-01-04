import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Subject } from "../entities/Subject";
import { Session } from "../entities/Session";
import { ClassEntity } from "../entities/ClassEntity";
import dotenv from "dotenv";
import { Attendance } from "../entities/Attendance";
import { ParentStudent } from "../entities/ParentStudent";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "edtech",
    synchronize: false,
    logging: true,
    cache: false,
    entities: [User, Subject, Session, ClassEntity, Attendance, ParentStudent],
    migrations: ["src/migrations/*.ts"],
});
