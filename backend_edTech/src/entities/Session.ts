import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Class } from "./Class";
import { User } from "./User";
import { Subject } from "./Subject";
import { Attendance } from "./Attendance";

@Entity("sessions")
export class Session{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    start_date : Date;
    
    @Column()
    end_date: Date;

    @ManyToOne(()=> Class, (classe) => classe.sessions)
    class: Class;

    @ManyToOne(()=> Subject, (subject) => subject.sessions)
    subject: Subject;

    @ManyToOne(() => User, (user) => user.sessions)
    teacher: User;

    @ManyToMany(() => Attendance, (Attendance) => Attendance.session)
    attendances: Attendance[];
}