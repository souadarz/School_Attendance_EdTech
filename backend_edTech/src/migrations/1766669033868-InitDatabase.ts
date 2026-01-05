import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1766669033868 implements MigrationInterface {
  name = "InitDatabase1766669033868";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "subjects" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_1a023685ac2b051b4e557b0b280" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "sessions" ("id" SERIAL NOT NULL, "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP NOT NULL, "classId" integer, "subjectId" integer, "teacherId" integer, CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "classes" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "level" character varying NOT NULL, CONSTRAINT "PK_e207aa15404e9b2ce35910f9f7f" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'teacher', 'student', 'parent')`
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "fullname" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "studentCode" character varying, "role" "public"."users_role_enum" NOT NULL, "classId" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_f139a5c7e5dba9670ae624bbfc2" UNIQUE ("studentCode"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "parent_student" ("parent_id" integer NOT NULL, "student_id" integer NOT NULL, CONSTRAINT "PK_23ccad4739345a07ab77436fbc4" PRIMARY KEY ("parent_id", "student_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_56c93c8885d58f23000148c9b2" ON "parent_student" ("parent_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9c2fadef93e1c8a720c428e996" ON "parent_student" ("student_id") `
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" ADD CONSTRAINT "FK_df8bda143f8079aed2bbe55342a" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" ADD CONSTRAINT "FK_d1ac69fcda1a14187be6448c3e2" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" ADD CONSTRAINT "FK_40745aaeed502b8ec9860900e2f" FOREIGN KEY ("teacherId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_d0fed6c2fc25ef43c2f29f5b192" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "parent_student" ADD CONSTRAINT "FK_56c93c8885d58f23000148c9b27" FOREIGN KEY ("parent_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "parent_student" ADD CONSTRAINT "FK_9c2fadef93e1c8a720c428e9969" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "parent_student" DROP CONSTRAINT "FK_9c2fadef93e1c8a720c428e9969"`
    );
    await queryRunner.query(
      `ALTER TABLE "parent_student" DROP CONSTRAINT "FK_56c93c8885d58f23000148c9b27"`
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_d0fed6c2fc25ef43c2f29f5b192"`
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" DROP CONSTRAINT "FK_40745aaeed502b8ec9860900e2f"`
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" DROP CONSTRAINT "FK_d1ac69fcda1a14187be6448c3e2"`
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" DROP CONSTRAINT "FK_df8bda143f8079aed2bbe55342a"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9c2fadef93e1c8a720c428e996"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_56c93c8885d58f23000148c9b2"`
    );
    await queryRunner.query(`DROP TABLE "parent_student"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(`DROP TABLE "classes"`);
    await queryRunner.query(`DROP TABLE "sessions"`);
    await queryRunner.query(`DROP TABLE "subjects"`);
  }
}
