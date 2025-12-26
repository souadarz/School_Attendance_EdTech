import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRelations1766744249549 implements MigrationInterface {
    name = 'UpdateRelations1766744249549'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_df8bda143f8079aed2bbe55342a"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_40745aaeed502b8ec9860900e2f"`);
        await queryRunner.query(`ALTER TABLE "parent_student" DROP CONSTRAINT "FK_56c93c8885d58f23000148c9b27"`);
        await queryRunner.query(`ALTER TABLE "parent_student" DROP CONSTRAINT "FK_9c2fadef93e1c8a720c428e9969"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_56c93c8885d58f23000148c9b2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9c2fadef93e1c8a720c428e996"`);
        await queryRunner.query(`CREATE TYPE "public"."attendance_status_enum" AS ENUM('present', 'absent', 'late', 'excused')`);
        await queryRunner.query(`CREATE TABLE "attendance" ("id" SERIAL NOT NULL, "status" "public"."attendance_status_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "studentId" integer, "sessionId" integer, CONSTRAINT "PK_ee0ffe42c1f1a01e72b725c0cb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "classes" DROP COLUMN "level"`);
        await queryRunner.query(`ALTER TABLE "parent_student" DROP CONSTRAINT "PK_23ccad4739345a07ab77436fbc4"`);
        await queryRunner.query(`ALTER TABLE "parent_student" ADD CONSTRAINT "PK_9c2fadef93e1c8a720c428e9969" PRIMARY KEY ("student_id")`);
        await queryRunner.query(`ALTER TABLE "parent_student" DROP COLUMN "parent_id"`);
        await queryRunner.query(`ALTER TABLE "parent_student" DROP CONSTRAINT "PK_9c2fadef93e1c8a720c428e9969"`);
        await queryRunner.query(`ALTER TABLE "parent_student" DROP COLUMN "student_id"`);
        await queryRunner.query(`ALTER TABLE "subjects" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "subjects" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "classes" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "classes" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "parent_student" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "parent_student" ADD CONSTRAINT "PK_3d737ca544c727cc6cbab618f0a" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "parent_student" ADD "relation" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "parent_student" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "parent_student" ADD "parentId" integer`);
        await queryRunner.query(`ALTER TABLE "parent_student" ADD "studentId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD CONSTRAINT "FK_120e1c6edcec4f8221f467c8039" FOREIGN KEY ("studentId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD CONSTRAINT "FK_4b3ed2a2a22881087475bc2e597" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "FK_df8bda143f8079aed2bbe55342a" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "FK_40745aaeed502b8ec9860900e2f" FOREIGN KEY ("teacherId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "parent_student" ADD CONSTRAINT "FK_3d02ab296296bdb240e89b8786d" FOREIGN KEY ("parentId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "parent_student" ADD CONSTRAINT "FK_9aced16411bd7d56126c91f30cd" FOREIGN KEY ("studentId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parent_student" DROP CONSTRAINT "FK_9aced16411bd7d56126c91f30cd"`);
        await queryRunner.query(`ALTER TABLE "parent_student" DROP CONSTRAINT "FK_3d02ab296296bdb240e89b8786d"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_40745aaeed502b8ec9860900e2f"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_df8bda143f8079aed2bbe55342a"`);
        await queryRunner.query(`ALTER TABLE "attendance" DROP CONSTRAINT "FK_4b3ed2a2a22881087475bc2e597"`);
        await queryRunner.query(`ALTER TABLE "attendance" DROP CONSTRAINT "FK_120e1c6edcec4f8221f467c8039"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "parent_student" DROP COLUMN "studentId"`);
        await queryRunner.query(`ALTER TABLE "parent_student" DROP COLUMN "parentId"`);
        await queryRunner.query(`ALTER TABLE "parent_student" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "parent_student" DROP COLUMN "relation"`);
        await queryRunner.query(`ALTER TABLE "parent_student" DROP CONSTRAINT "PK_3d737ca544c727cc6cbab618f0a"`);
        await queryRunner.query(`ALTER TABLE "parent_student" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "classes" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "classes" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "subjects" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "subjects" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "parent_student" ADD "student_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "parent_student" ADD CONSTRAINT "PK_9c2fadef93e1c8a720c428e9969" PRIMARY KEY ("student_id")`);
        await queryRunner.query(`ALTER TABLE "parent_student" ADD "parent_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "parent_student" DROP CONSTRAINT "PK_9c2fadef93e1c8a720c428e9969"`);
        await queryRunner.query(`ALTER TABLE "parent_student" ADD CONSTRAINT "PK_23ccad4739345a07ab77436fbc4" PRIMARY KEY ("parent_id", "student_id")`);
        await queryRunner.query(`ALTER TABLE "classes" ADD "level" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "attendance"`);
        await queryRunner.query(`DROP TYPE "public"."attendance_status_enum"`);
        await queryRunner.query(`CREATE INDEX "IDX_9c2fadef93e1c8a720c428e996" ON "parent_student" ("student_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_56c93c8885d58f23000148c9b2" ON "parent_student" ("parent_id") `);
        await queryRunner.query(`ALTER TABLE "parent_student" ADD CONSTRAINT "FK_9c2fadef93e1c8a720c428e9969" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "parent_student" ADD CONSTRAINT "FK_56c93c8885d58f23000148c9b27" FOREIGN KEY ("parent_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "FK_40745aaeed502b8ec9860900e2f" FOREIGN KEY ("teacherId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "FK_df8bda143f8079aed2bbe55342a" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
