import type { ApiResponse } from "../../../shared/interfaces/ApiResponse"
import type { Class } from "../../../shared/interfaces/Class"
import api from "./axios"

export const getTeacherClasses = async (): Promise<Class[]> => {
    const res = await api.get<ApiResponse<Class[]>>("/classes/teacher");
    return res.data.data;
}

export const getAllClasses = async (): Promise<Class[]> => {
    const res= await api.get<ApiResponse<Class[]>>("/classes");
    return res.data.data;
}