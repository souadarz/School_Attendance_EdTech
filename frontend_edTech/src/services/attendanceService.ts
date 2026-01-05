import type { AttendanceStatus } from "../../../shared/enums/AttendanceStatus.enum";
import type { ApiResponse } from "../../../shared/interfaces/ApiResponse";
import type { SessionAttendanceResponse } from "../../../shared/interfaces/SessionAttendanceResponse";
import api from "./axios";

export const updateSessionAttendance = async (
  sessionId: number,
  attendances: Array<{ studentId: number; status: AttendanceStatus }>
): Promise<void> => {
  const res = await api.put(`/attendances/sessions/${sessionId}/bulk`, {
    attendances,
  });
  return res.data.data;
};

export const getSessionAttendance =  async (sessionId: number): Promise<SessionAttendanceResponse> => {
   const res = await api.get<ApiResponse<SessionAttendanceResponse>>(`/attendances/sessions/${sessionId}/`);
   return res.data.data;
}