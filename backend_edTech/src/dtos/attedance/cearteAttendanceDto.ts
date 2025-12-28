import { AttendanceStatus } from "../../../../shared/enums/AttendanceStatus.enum";

export interface CreateAttendanceDTO{
    status: AttendanceStatus;
    studentId: number;
    sessionId: number;
}