import { AppDataSource } from "../config/ormConfig";
import { Subject } from "../entities/Subject";

const subjectRepository = AppDataSource.getRepository(Subject);

export const getSubjects = async (): Promise<Subject[]> =>{
    const subjects = await subjectRepository.find({
        relations: ["sessions"]
    });
    return subjects;
}