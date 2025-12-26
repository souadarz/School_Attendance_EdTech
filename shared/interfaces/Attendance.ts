import { User } from "./User";
import { Session } from "./Session";
import { AttendanceStatus } from "../enums/AttendanceStatu.enum";

export interface Attendance {
  id: number;
  status: AttendanceStatus;
  createdAt: Date;
  student?: User;     // parent
  session?: Session;  // parent
}
