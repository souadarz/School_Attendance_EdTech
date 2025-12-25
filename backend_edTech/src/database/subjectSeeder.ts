import { DataSource } from "typeorm";
import { Subject } from "../entities/Subject";

export const seedSubjects = async (dataSource: DataSource) => {
  const subjectRepository = dataSource.getRepository(Subject);

  const subjectsData = [
    { name: "Mathematics" },
    { name: "Physics" },
    { name: "Chemistry" },
    { name: "Biology" },
    { name: "History" },
  ];

  for (const subject of subjectsData) {
    const existing = await subjectRepository.findOne({ where: { name: subject.name } });
    if (!existing) {
      const newSubject = subjectRepository.create(subject);
      await subjectRepository.save(newSubject);
      console.log(`Subject "${subject.name}" seeded`);
    }
  }
};
