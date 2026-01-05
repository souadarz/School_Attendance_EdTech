import { DataSource } from "typeorm";
import { ClassEntity } from "../entities/ClassEntity";
import { User } from "../entities/User";
import { Role } from "../../../shared/enums/Role.enum";

export async function seedClasses(dataSource: DataSource) {
  const classRepository = dataSource.getRepository(ClassEntity);
  const userRepository = dataSource.getRepository(User);

  const teachers = await userRepository.find({ where: { role: Role.TEACHER } });

  if (teachers.length === 0) {
    console.log("No teachers found, cannot seed classes.");
    return;
  }

  const classes: Partial<ClassEntity>[] = [
    { name: "Class 1A", teacher: teachers[0] },
    { name: "Class 1B", teacher: teachers[1] },
    { name: "Class 2A", teacher: teachers[0] },
    { name: "Class 2B", teacher: teachers[1] },
    { name: "Class 3A", teacher: teachers[0] },
  ];

  for (const cls of classes) {
    const existingClass = await classRepository.findOne({ where: { name: cls.name } });
    if (!existingClass) {
      await classRepository.save(classRepository.create(cls));
      console.log(`Class "${cls.name}" seeded`);
    } else {
      console.log(`Class "${cls.name}" already exists, skipped`);
    }
  }

  console.log("All classes processed successfully");
}
