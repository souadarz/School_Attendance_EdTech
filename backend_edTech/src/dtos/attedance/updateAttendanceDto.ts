import { AttendanceStatus } from "../../../../shared/enums/AttendanceStatus.enum";

export interface UpdateAttendanceDTO{
    status?: AttendanceStatus;
    studentId?: number;
    sessionId?: number;
}