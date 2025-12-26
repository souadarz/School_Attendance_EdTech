import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity("parent_student")
export class ParentStudent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  relation: string;

  @ManyToOne(() => User, (user) => user.childrens)
  parent: User;

  @ManyToOne(() => User, (user) => user.parents)
  student: User;

  @CreateDateColumn()
  createdAt: Date;
}
