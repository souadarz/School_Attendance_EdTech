import { Request, Response } from "express";
import { getStudents } from "../services/userService";

export const getAllStudents = async (req: Request, res : Response) =>{
    try{
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
}