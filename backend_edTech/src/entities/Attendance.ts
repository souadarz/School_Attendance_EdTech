import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AttendanceStatus } from "../../../shared/enums/AttendanceStatus.enum";
import { User } from "./User";
import { Session } from "./Session";

@Entity("attendance")
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: AttendanceStatus })
  status: AttendanceStatus;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.attendances, { onDelete: "CASCADE" })
  student: User;

  @ManyToOne(() => Session, (session) => session.attendances, {
    onDelete: "CASCADE",
  })
  session: Session;
}
