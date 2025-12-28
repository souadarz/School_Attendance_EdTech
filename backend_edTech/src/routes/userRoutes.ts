import express from "express"
import { getAllStudents } from "../controllers/userController";
import { Role } from "../../../shared";
import { roleMiddleware } from "../middlewares/auth";

const router = express.Router();

router.get("/", roleMiddleware(Role.ADMIN, Role.STUDENT), getAllStudents);

export default router;