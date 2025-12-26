import { User } from "./User";

export interface Class {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  students?: User[]
}
