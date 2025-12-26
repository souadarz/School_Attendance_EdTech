import { Role } from "../enums/Role.enum";
import { Class } from "./Class";
import { Attendance} from "./Attendance";
import { Session } from "./Session";
import { ParentStudent } from "./ParentStudent";

export interface User {
  id: number;
  fullname: string;
  email: string;
  password: string;
  studentCode?: string | null;
  role: Role;
  createdAt: Date;
  updatedAt: Date;

  class?: Class | null; // relation ManyToOne vers Class
  sessions?: Session[]; // relation OneToMany vers Session (enseignant)
  attendances?: Attendance[]; // relation OneToMany vers Attendance (étudiant)
  parents?: ParentStudent[]; // relation OneToMany vers ParentStudent (parents)
  childrens?: ParentStudent[]; // relation OneToMany vers ParentStudent (enfants)
}
