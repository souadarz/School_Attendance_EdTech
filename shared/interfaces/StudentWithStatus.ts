import { AttendanceStatus } from "../enums/AttendanceStatus.enum";

export interface StudentWithStatus {
  id: number;
  fullname: string;
  status: AttendanceStatus | null;
}
