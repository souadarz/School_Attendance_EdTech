import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Session } from "./Session";

@Entity("classes")
export class ClassEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => User, (user) => user.class)
  students: User[];

  @OneToMany(() => Session, (session) => session.class)
  sessions: Session[];

  @ManyToOne(()=> User, (user)=>user.classes)
  @JoinColumn({ name: "teacherId" }) 
  teacher: User;
}
