import { User } from "./User";

export interface ParentStudent {
  id: number;
  relation: string;
  createdAt: Date;
  parent?: User;
  student?: User;
}
