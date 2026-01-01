import { Request, Response } from "express";
import {
  create,
  delet,
  findAll,
  findById,
  update,
} from "../services/attendanceService";
import { CreateAttendanceDTO } from "../dtos/attedance/cearteAttendanceDto";

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
