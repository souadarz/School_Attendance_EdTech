import type { Session } from "../../../shared/interfaces/Session";
import type { ApiResponse } from "../../../shared/interfaces/ApiResponse";
import api from "./axios";

export const getTeacherSessions = async ():Promise<Session[]> =>{
    const res = await api.get<ApiResponse<Session[]>>("/sessions/teachers");
    return res.data.data;
};