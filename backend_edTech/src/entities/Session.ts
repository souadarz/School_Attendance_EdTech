import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Class } from "./Class";
import { User } from "./User";
import { Subject } from "./Subject";
import { Attendance } from "./Attendance";

@Entity("sessions")
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Class, (classe) => classe.sessions, { onDelete: "CASCADE"})
  class: Class;

  @ManyToOne(() => Subject, (subject) => subject.sessions)
  subject: Subject;

  @ManyToOne(() => User, (user) => user.sessions, {onDelete: "SET NULL"})
  teacher: User;

  @OneToMany(() => Attendance, (Attendance) => Attendance.session)
  attendances: Attendance[];
}
