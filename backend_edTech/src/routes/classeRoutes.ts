import express from "express"
import { getAllClasses, getTeacherClasses } from "../controllers/classesController";
import { roleMiddleware } from "../middlewares/auth";
import { Role } from "../../../shared";

const router = express.Router();

router.get("/",roleMiddleware(Role.ADMIN), getAllClasses);
router.get("/teacher",roleMiddleware(Role.TEACHER), getTeacherClasses);

export default router;