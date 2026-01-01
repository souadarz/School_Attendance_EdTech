import type { Session } from "../../../shared/interfaces/Session";
import api from "./axios";

export const getTeacherSessions = async ():Promise<Session[]> =>{
    const res = await api.get("/sessions/teachers");
    return res.data.data;
}