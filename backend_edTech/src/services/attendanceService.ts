import { error } from "node:console";
import { AppDataSource } from "../config/ormConfig";
import { CreateAttendanceDTO } from "../dtos/attedance/cearteAttendanceDto";
import { Attendance } from "../entities/Attendance";
import { Session } from "../entities/Session";
import { User } from "../entities/User";
import { UpdateAttendanceDTO } from "../dtos/attedance/updateAttendanceDto";

const UserRepository = AppDataSource.getRepository(User);
const sessionRepository = AppDataSource.getRepository(Session);
const attendanceRepository = AppDataSource.getRepository(Attendance);

export const create = async (
  id: number,
  data: CreateAttendanceDTO
): Promise<Attendance> => {
  const existingAttendance = await attendanceRepository.exists({
    where: {
      student: { id: data.studentId },
      session: { id: data.sessionId },
    },
  });

  if (existingAttendance) {
    throw {
      status: 400,
      message: "attendance for this student and session already exists",
    };
  }

  const student = await UserRepository.findOne({
    where: { id: data.studentId },
    relations: ["class"],
  });
  if (!student) throw { status: 404, message: "student not found" };

  const session = await sessionRepository.findOne({
    where: { id: data.sessionId },
    relations: ["class", "teacher"],
  });
  if (!session) throw { status: 404, message: "Session not found" };

  if (session.teacher.id !== id) {
    throw { status: 403, message: "You are not the teacher of this session" };
  }

  if (student.class?.id !== session.class.id) {
    throw {
      status: 403,
      message: "This student does not belong to your class",
    };
  }

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

export const update = async (
  id: number,
  data: UpdateAttendanceDTO
): Promise<Attendance> => {
  const attendance = await findById(id);

  if (data.status) attendance.status = data.status;

  if (data.studentId) {
    const student = await UserRepository.findOneBy({ id: data.studentId });
    if (!student) throw new Error("student not found");
    attendance.student = student;
  }

  if (data.sessionId) {
    const session = await sessionRepository.findOneBy({ id: data.sessionId });
    if (!session) throw new Error("session not found");
    attendance.session = session;
  }

  return attendanceRepository.save(attendance);
};

export const delet = async (id: number): Promise<void> => {
  const result = await attendanceRepository.delete(id);
  if (result.affected === 0) throw new Error("attendance not found");
};

export const getSessionAttendanceData = async (sessionId: number) => {
  const session = await sessionRepository.findOne({
    where: { id: sessionId },
    relations: {
      class: { students: true },
      attendances: { student: true },
      subject: true,
    },
  });

  if (!session) {
    throw new Error("Session not found");
  }

  const students = session.class.students.map((student) => {
    const attendance = session.attendances.find(
      (a) => a.student.id === student.id
    );

    return {
      id: student.id,
      fullname: student.fullname,
      status: attendance?.status ?? null,
    };
  });

  return {
    sessionId: session.id,
    className: session.class.name,
    subjectName: session.subject.name,
    students,
  };
};
