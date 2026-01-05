import { Role } from "../../../shared/enums/Role.enum";
import { AppDataSource } from "../config/ormConfig";
import { User } from "../entities/User";

const userRepository = AppDataSource.getRepository(User);

export const getStudents = async (): Promise<User[]> => {
  return userRepository.find({
    where: { role: Role.STUDENT },
    relations: ["class"]
  });
};