import { Request, Response } from "express";
import { findteacherClasses, getClasses } from "../services/classeService";

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

export const getTeacherClasses = async (req: Request, res: Response)=>{
  try {
    console.log("Controller getTeacherClasses called");
    if(!req.user) return res.status(401).json({message: "unauthenticated"});
    console.log("teeeacher",req.user);
    const teacherId = req.user.id;
    const teacherClasses = await findteacherClasses(Number(teacherId));

    res.status(200).json({
      success : true,
      message: "teacher classes retrieved successfuly ",
      data: teacherClasses
    });
  } catch (error: any) {
    res.status(404).json({ message: error.message || "failed to retrieve teacher classes"})
  }
}
