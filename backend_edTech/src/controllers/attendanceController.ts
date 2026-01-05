import { Request, Response } from "express";
import {
  create,
  delet,
  findAll,
  findById,
  getSessionAttendanceData,
  update,
} from "../services/attendanceService";
import { CreateAttendanceDTO } from "../dtos/attedance/cearteAttendanceDto";
import { AppDataSource } from "../config/ormConfig";
import { Attendance } from "../entities/Attendance";

export const attendanceRepository =
  AppDataSource.getRepository(Attendance);

export const createAttendance = async (req: Request, res: Response) => {
  try {
    if(!req.user) return res.status(401).json({message: "unautenticated"});

    const teacherId = req.user.id;
    const {studentId, sessionId, status} = req.body;

    const attendance = await create(teacherId, req.body as CreateAttendanceDTO);
    res.status(201).json({
      success: true,
      message: "attendance created successfully",
      data: attendance,
    });
  } catch (error: any) {
    const status = error.status || 400;
    res.status(status).json({
      success: false,
      message: error.message || "Failed to create attendance",
    });
  }
};

export const getAllAttendance = async (req: Request, res: Response) => {
  try {
    const attendances = await findAll();

    res.status(200).json({
      success: true,
      message: "attendances retreived successfuly",
      data: attendances,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: error.message || "failed to retreive attendances" });
  }
};

export const getAttendanceById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const attendance = await findById(id);

    if (!attendance)
      return res.status(404).json({
        message: "attendance not found",
      });

    res.status(200).json({
      success: true,
      message: "attendance retreived with success",
      data: attendance,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: error.message || "failed to retreive attendances" });
  }
};

export const updateAttendance = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const attendance = await update(id, req.body);
    res.status(200).json({
      success: true,
      message: "attendance updated with success",
      data: attendance,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message || "failed to update attendance"});
  }
};

export const deleteAttendance = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await delet(id);
    res.json({ message: "attendance deleted successfully" });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};


export const getSessionAttendance = async (req: Request, res: Response) => {
  try {
    const sessionId = Number(req.params.id);

    if (isNaN(sessionId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid session id",
      });
    }

    const sessionAttendance = await getSessionAttendanceData(sessionId);

    res.status(200).json({
      success: true,
      message: "Attendance session retrieved successfully",
      data: sessionAttendance
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve attendance",
    });
  }
};

export const updateSessionAttendanceBulk = async (req: Request, res: Response) => {
  try {
    const sessionId = Number(req.params.id);
    const { attendances } = req.body;

    if (isNaN(sessionId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid session id",
      });
    }

    if (!Array.isArray(attendances)) {
      return res.status(400).json({
        success: false,
        message: "Attendances must be an array",
      });
    }

    await attendanceRepository.manager.transaction(async (manager) => {
      for (const { studentId, status } of attendances) {
        const existing = await manager.findOne(Attendance, {
          where: {
            session: { id: sessionId },
            student: { id: studentId },
          },
        });

        if (existing) {
          existing.status = status;
          await manager.save(existing);
        } else {
          await manager.save(Attendance, {
            session: { id: sessionId },
            student: { id: studentId },
            status,
          });
        }
      }
    });

    res.status(200).json({
      success: true,
      message: "Attendance updated successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update attendance",
    });
  }
};
