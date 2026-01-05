import { Request, Response } from "express";
import { getStudents } from "../services/userService";
import { AppDataSource } from "../config/ormConfig";
import { User } from "../entities/User";

const userRepository = AppDataSource.getRepository(User);

export const getUserConnected = async (req: Request, res: Response) => {
  const user = await userRepository.findOne({
    where: { id: req.userId },
    select: ["id","fullname", "email", "role"],
  });

  return res.json(user);
};

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await getStudents();
    res.status(200).json({
      success: true,
      message: "students retrieved successfuly",
      data: students,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: error.message || "failed to retrieve students" });
  }
};
