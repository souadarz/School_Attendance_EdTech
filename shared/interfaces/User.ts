import { Role } from "../enums/Role.enum";
import type { Class } from "./Class";
import type { Attendance} from "./Attendance";
import type { Session } from "./Session";
import type { ParentStudent } from "./ParentStudent";

export interface User {
  id: number;
  fullname: string;
  email: string;
  password?: string;
  studentCode?: string | null;
  role: Role;
  createdAt: string;
  updatedAt: string;

  class?: Class | null;
  sessions?: Session[];
  attendances?: Attendance[];
  parents?: ParentStudent[];
  childrens?: ParentStudent[];
  classes?: Class[];
}
