import { Request, Response } from "express";
import { Class } from "../entities/Class";
import { AppDataSource } from "../config/ormConfig";

const classRepository = AppDataSource.getRepository(Class);

export const getClasses = async (): Promise<Class[]> =>{
    const classes = await classRepository.find({
        relations: ["students", "sessions"]
    });
    return classes;
}