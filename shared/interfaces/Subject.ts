import { Session } from "./Session";
export interface Subject {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  sessions?: Session;
}