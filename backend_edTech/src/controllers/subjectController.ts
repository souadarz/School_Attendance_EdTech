import { Request, Response } from "express";
import { getSubjects } from "../services/subjectService";

export const getAllSubjects = async (req: Request, res: Response) => {
  try {
    const subjects = await getSubjects();

    res.status(200).json({
      success: true,
      message: "subjects retrieved successfuly",
      data: subjects,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: error.message || "failed to retrieve subjects" });
  }
};
