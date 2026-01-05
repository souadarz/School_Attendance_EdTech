import type { StudentWithStatus } from "./StudentWithStatus";

export interface SessionAttendanceResponse {
  sessionId: number;
  class: string;
  subject: string;
  students: StudentWithStatus[];
}