import { AppDataSource } from "../config/ormConfig";
import { seedUsers } from "./userSeeder";
import { seedSubjects } from "./subjectSeeder";

AppDataSource.initialize()
  .then(async () => {
    console.log("Database connected");

    await seedUsers(AppDataSource);
    await seedSubjects(AppDataSource);

    await AppDataSource.destroy();
    console.log("Seeding finished");
  })
  .catch((error) => {
    console.error("Seeder error:", error);
    process.exit(1);
  });
