import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Role } from "../../../shared/enums/Role.enum";
import { ClassEntity } from "./ClassEntity";
import { Session } from "./Session";
import { Attendance } from "./Attendance";
import { ParentStudent } from "./ParentStudent";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true, nullable: true })
  studentCode: string;

  @Column({ type: "enum", enum: Role })
  role: Role;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => ClassEntity, (classe) => classe.students, { nullable: true })
  class?: ClassEntity;

  // Enseignant -> sessions
  @OneToMany(() => Session, (session) => session.teacher, { nullable: true })
  sessions: Session[];

  // Étudiant → présences
  @OneToMany(() => Attendance, (attendance) => attendance.student, {
    nullable: true,
  })
  attendances: Attendance[];

  @OneToMany(() => ParentStudent, (user) => user.student)
  parents: ParentStudent[];

  @OneToMany(() => ParentStudent, (user) => user.parent)
  childrens: ParentStudent[];

  @OneToMany(() => ClassEntity, (classEntity) => classEntity.teacher)
  classes?: ClassEntity[];
}
