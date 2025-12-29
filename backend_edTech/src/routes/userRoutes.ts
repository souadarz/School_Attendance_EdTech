import express from "express"
import { getAllStudents, getUserConnected } from "../controllers/userController";
import { Role } from "../../../shared";
import { authenticate, roleMiddleware } from "../middlewares/auth";

const router = express.Router();

router.get("/", roleMiddleware(Role.ADMIN, Role.STUDENT), getAllStudents);
router.get("/me", authenticate, getUserConnected);

export default router;