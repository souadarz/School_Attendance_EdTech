import type{ User } from "./User";

export interface ParentStudent {
  id: number;
  relation: string;
  createdAt: string;
  parent?: User;
  student?: User;
}
