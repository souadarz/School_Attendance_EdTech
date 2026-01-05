import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { ClassEntity } from "../entities/ClassEntity";
import { Role } from "../../../shared/enums/Role.enum";
import bcrypt from "bcrypt";

export async function seedStudents(dataSource: DataSource) {
  const userRepository = dataSource.getRepository(User);
  const classRepository = dataSource.getRepository(ClassEntity);

  const classes = await classRepository.find();
  if (classes.length === 0) {
    console.log("No classes found, cannot seed students.");
    return;
  }

  const password = await bcrypt.hash("password123", 10);

  const students: Partial<User>[] = [
    { fullname: "Student One", email: "student1@school.com", password, role: Role.STUDENT, studentCode: "STU001", class: classes[0] },
    { fullname: "Student Two", email: "student2@school.com", password, role: Role.STUDENT, studentCode: "STU002", class: classes[0] },
    { fullname: "Student Three", email: "student3@school.com", password, role: Role.STUDENT, studentCode: "STU003", class: classes[1] },
    { fullname: "Student Four", email: "student4@school.com", password, role: Role.STUDENT, studentCode: "STU004", class: classes[1] },
    { fullname: "Student Five", email: "student5@school.com", password, role: Role.STUDENT, studentCode: "STU005", class: classes[2] },
    { fullname: "Student Six", email: "student6@school.com", password, role: Role.STUDENT, studentCode: "STU006", class: classes[2] },
    { fullname: "Student Seven", email: "student7@school.com", password, role: Role.STUDENT, studentCode: "STU007", class: classes[3] },
    { fullname: "Student Eight", email: "student8@school.com", password, role: Role.STUDENT, studentCode: "STU008", class: classes[3] },
  ];

  for (const student of students) {
    const existingUser = await userRepository.findOne({ where: { email: student.email } });
    if (!existingUser) {
      await userRepository.save(userRepository.create(student));
      console.log(`Student "${student.fullname}" seeded`);
    } else {
      console.log(`Student "${student.fullname}" already exists, skipped`);
    }
  }

  console.log("All students processed successfully");
}
