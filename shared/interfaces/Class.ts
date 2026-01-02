import type { User } from "./User";

export interface Class {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  students?: User[]
}
