// src/database/classSeeder.ts
import { DataSource } from "typeorm";
import { Class } from "../entities/Class";

export async function seedClasses(dataSource: DataSource) {
  const classRepository = dataSource.getRepository(Class);

  const classes: Partial<Class>[] = [
    { name: "Class 1A" },
    { name: "Class 1B" },
    { name: "Class 2A" },
    { name: "Class 2B" },
    { name: "Class 3A" },
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
