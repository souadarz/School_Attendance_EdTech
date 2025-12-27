import { Request, Response } from "express";
import {
  create,
  delet,
  findAll,
  findById,
  update,
} from "../services/SessionService";
import { CreateSessionDTO } from "../dtos/session/createSessionDto";

export const createSession = async (req: Request, res: Response) => {
  try {
    const session = await create(req.body as CreateSessionDTO);
    res.status(201).json({
      success: true,
      message: "Session created successfully",
      data: session,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create session",
    });
  }
};

export const getAllSession = async (req: Request, res: Response) => {
  try {
    const sessions = await findAll();

    res.status(200).json({
      success: true,
      message: "sessions retreived successfuly",
      data: sessions,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: error.message || "failed to retreive sessions" });
  }
};

export const getSessionById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const session = await findById(id);

    if (!session)
      return res.status(404).json({
        message: "session not found",
      });

    res.status(200).json({
      success: true,
      message: "session retreived with success",
      data: session,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: error.message || "failed to retreive sessions" });
  }
};

export const updateSession = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const session = await update(id, req.body);
    res.status(200).json({
      success: true,
      message: "session updated with success",
      data: session,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message || "failed to update session"});
  }
};

export const deleteSession = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await delet(id);
    res.json({ message: "Session deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
