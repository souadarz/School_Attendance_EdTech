import { AppDataSource } from "../config/ormConfig";
import { seedUsers } from "./userSeeder";
import { seedSubjects } from "./subjectSeeder";
import { seedClasses } from "./classSeeder";
import { seedStudents } from "./StudentSeeder";

AppDataSource.initialize()
  .then(async () => {
    console.log("Database connected");

    await seedUsers(AppDataSource);
    await seedClasses(AppDataSource);
    await seedStudents(AppDataSource);
    await seedSubjects(AppDataSource);

    await AppDataSource.destroy();
    console.log("Seeding finished");
  })
  .catch((error) => {
    console.error("Seeder error:", error);
    process.exit(1);
  });
