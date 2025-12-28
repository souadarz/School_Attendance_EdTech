import { error } from "node:console";
import { AppDataSource } from "../config/ormConfig";
import { CreateAttendanceDTO } from "../dtos/attedance/cearteAttendanceDto";
import { Attendance } from "../entities/Attendance";
import { Session } from "../entities/Session";
import { User } from "../entities/User";
import { UpdateAttendanceDTO } from "../dtos/attedance/updateattendanceDto";

const UserRepository = AppDataSource.getRepository(User);
const sessionRepository = AppDataSource.getRepository(Session);
const attendanceRepository = AppDataSource.getRepository(Attendance);

export const create = async (
  data: CreateAttendanceDTO
): Promise<Attendance> => {
  const student = await UserRepository.findOneBy({ id: data.studentId });
  if (!student) throw new Error("student not found");

  const session = await sessionRepository.findOneBy({ id: data.sessionId });
  if (!session) throw new Error("session not found");

  const attendance = attendanceRepository.create({
    status: data.status,
    student,
    session,
  });
  return await attendanceRepository.save(attendance);
};

export const findAll = async (): Promise<Attendance[]> => {
  const attendances = await attendanceRepository.find({
    relations: ["student", "session"],
  });
  return attendances;
};

export const findById = async (id: number): Promise<Attendance> => {
  const attendance = await attendanceRepository.findOne({
    where: { id },
    relations: ["student", "session"],
  });

  if (!attendance) {
    throw new Error("Attendance not found");
  }
  return attendance;
};

export const update = async (id: number, data: UpdateAttendanceDTO): Promise<Attendance> => {
  const attendance = await findById(id);

  if(data.status) attendance.status = data.status;

  if(data.studentId) {
    const student = await UserRepository.findOneBy({id: data.studentId});
    if(!student) throw new Error("student not found");
    attendance.student = student
  }

  if(data.sessionId){
    const session = await sessionRepository.findOneBy({id: data.sessionId});
    if(!session) throw new Error("session not found");
    attendance.session = session;
  }

  return attendanceRepository.save(attendance);
}

export const delet = async (id: number): Promise<void> => {
    const result = await attendanceRepository.delete(id);
    if(result.affected === 0) throw new Error("attendance not found");
}