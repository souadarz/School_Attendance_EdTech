import { DataSource } from "typeorm";
import bcrypt from "bcrypt";
import { User } from "../entities/User";
import { Role } from "../../../shared/enums/Role.enum";

export async function seedUsers(dataSource: DataSource) {
  const userRepository = dataSource.getRepository(User);

  const password = await bcrypt.hash("password123", 10);

  const users: Partial<User>[] = [
    // admins
    { fullname: "Admin One", email: "admin1@school.com", password, role: Role.ADMIN },
    { fullname: "Admin Two", email: "admin2@school.com", password, role: Role.ADMIN },

    // teachers
    { fullname: "Teacher One", email: "teacher1@school.com", password, role: Role.TEACHER },
    { fullname: "Teacher Two", email: "teacher2@school.com", password, role: Role.TEACHER },

    // parents
    { fullname: "Parent One", email: "parent1@school.com", password, role: Role.PARENT },
    { fullname: "Parent Two", email: "parent2@school.com", password, role: Role.PARENT },
  ];

  for (const user of users) {
    const existingUser = await userRepository.findOne({ where: { email: user.email } });
    if (!existingUser) {
      await userRepository.save(userRepository.create(user));
      console.log(`User "${user.fullname}" seeded`);
    } else {
      console.log(`User "${user.fullname}" already exists, skipped`);
    }
  }

  console.log("All users processed successfully");
}
