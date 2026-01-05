import type { Session } from "./Session";
export interface Subject {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  sessions?: Session;
}