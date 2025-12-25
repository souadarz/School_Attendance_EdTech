import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AttendanceStatus } from "../../../shared/enums/AttendanceStatu.enum";
import { User } from "./User";
import { Session } from "./Session";

@Entity("attendance")
export class Attendance{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "enum", enum: AttendanceStatus })
    status: AttendanceStatus;

    @ManyToOne(() => User, (user) => user.attendances)
    student: User;

    @ManyToOne(() => Session, (session) => session.attendances)
    session: AttendanceStatus;
}