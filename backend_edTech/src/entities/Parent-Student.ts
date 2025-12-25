import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity("parent_student")
export class parent_student{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    relation: string;

    @ManyToMany(() => User, (user) => user.
}