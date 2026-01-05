import type { User } from "./User";
import type { Session } from "./Session";
import { AttendanceStatus } from "../enums/AttendanceStatus.enum";

export interface Attendance {
  id: number;
  status: AttendanceStatus;
  createdAt: string;
  student: User;
  session: Session;
}
