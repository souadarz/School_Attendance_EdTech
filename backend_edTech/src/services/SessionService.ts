import { AppDataSource } from "../config/ormConfig";
import { Class } from "../entities/Class";
import { Session } from "../entities/Session";
import { Subject } from "../entities/Subject";
import { User } from "../entities/User";
import { CreateSessionDTO } from "../dtos/session/createSessionDto";
import { UpdateSessionDTO } from "../dtos/session/updateSessionDto";

const sessionRepository = AppDataSource.getRepository(Session);
const classRepository = AppDataSource.getRepository(Class);
const subjectRepository = AppDataSource.getRepository(Subject);
const userRepository = AppDataSource.getRepository(User);

export const create = async (data: CreateSessionDTO): Promise<Session> => {
  const classe = await classRepository.findOneBy({ id: data.classId });
  if (!classe) throw new Error("class not found");
  
  const subject = await subjectRepository.findOneBy({
    id: data.subjectId,
  });
  if (!subject) throw new Error("subject not found");
  
  const teacher = await userRepository.findOneBy({ id: data.teacherId });
  if (!teacher) throw new Error("teacher not found");
  
  const session = sessionRepository.create({
    start_date: data.start_date,
    end_date: data.end_date,
    class: classe,
    subject,
    teacher,
  });
  return sessionRepository.save(session);
};

export const findAll = async (): Promise<Session[]> => {
  return sessionRepository.find({
    relations: ["class", "subject", "teacher", "attendances"]
  });  
}

export const findById = async (id: number): Promise<Session | null> => {
  return sessionRepository.findOne({
    where: { id },
    relations: ["class", "subject", "teacher", "attendances"],
  });
};

export const update = async (
  id: number,
  data: UpdateSessionDTO
): Promise<Session> => {
  const session = await findById(id);
  if (!session) throw new Error("Session not found");

  if (data.start_date) session.start_date = data.start_date;
  if (data.end_date) session.end_date = data.end_date;

  if (data.classId) {
    const classe = await classRepository.findOneBy({ id: data.classId });
    if (!classe) throw new Error("Class not found");
    session.class = classe;
  }

  if (data.subjectId) {
    const subject = await subjectRepository.findOneBy({ id: data.subjectId });
    if (!subject) throw new Error("subject not foud");
    session.subject = subject;
  }

  if (data.teacherId) {
    const teacher = await userRepository.findOneBy({ id: data.teacherId });
    if (!teacher) throw new Error("teacher not found");
    session.teacher = teacher;
  }

  return sessionRepository.save(session);
};

export const delet = async (id : number): Promise<void> => {
  const result = await sessionRepository.delete(id);
  if(result.affected === 0) throw new Error("session not found");
}