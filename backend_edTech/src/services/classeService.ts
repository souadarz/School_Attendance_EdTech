import { ClassEntity } from "../entities/ClassEntity";
import { AppDataSource } from "../config/ormConfig";

const classRepository = AppDataSource.getRepository(ClassEntity);

export const getClasses = async (): Promise<ClassEntity[]> => {
  const classes = await classRepository.find({
    relations: ["students", "sessions"],
  });

  if (!classes) {
    throw new Error("classes not found");
  }
  return classes;
};

export const findteacherClasses = async (
  teacherId: number
): Promise<ClassEntity[]> => {
  const teacherClasses = await classRepository.find({
    where: {
      teacher: { id: teacherId },
    },
    relations: ["teacher", "sessions", "students"],
  });

  console.log("cccccccccccccc", teacherClasses);
  if (teacherClasses.length === 0) {
    throw new Error("No classes found for this teacher");
  }
  return teacherClasses;
};
