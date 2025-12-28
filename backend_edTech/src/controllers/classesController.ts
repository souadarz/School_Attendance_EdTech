import { Request, Response } from "express";
import { getClasses } from "../services/classeService";

export const getAllClasses = async (req: Request, res: Response) => {
  try {
    const classes = await getClasses();

    res.status(200).json({
      success: true,
      message: "classes retrieved successfuly",
      data: classes,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: error.message || "failed to retrieve classes" });
  }
};
