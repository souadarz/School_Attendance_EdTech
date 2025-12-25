import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Session } from "./Session";

@Entity("subjects")
export class Subject{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Session, (session) => session.subject)
    sessions: Session;
}