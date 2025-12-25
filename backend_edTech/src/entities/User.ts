import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../../../shared/enums/Role.enum";
import { Class } from "./Class";
import { Session } from "./Session";
import { Attendance } from "./Attendance";

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

  // @CreateDateColumn() 
  // createdAt : Date ;

  // @CreateDateColumn() 
  // updatedAt : Date ; 

  @ManyToOne(() => Class, (classe) => classe.students, { nullable: true })
  class?: Class;

  // Enseignant -> sessions
  @OneToMany(() => Session, (session) => session.teacher)
  sessions: Session[];

  // Étudiant → présences
  @OneToMany(() => Attendance, (attendance) => attendance.student)
  attendances: Attendance[];

  @ManyToMany(() => User, (user) => user.parents)
  @JoinTable({
    name: "parent_student",
    joinColumn: { name: "parent_id" },
    inverseJoinColumn: { name: "student_id" },
  })
  children: User[];

  @ManyToMany(() => User, (user) => user.children)
  parents: User[];
}
