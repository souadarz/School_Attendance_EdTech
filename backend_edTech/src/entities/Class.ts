import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Session } from "./Session";

@Entity("classes")
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  level: string;

  @OneToMany(() => User, (user) => user.class)
  students: User[];

  @OneToMany(() => Session, (session) => session.class)
  sessions: Session[];
}
