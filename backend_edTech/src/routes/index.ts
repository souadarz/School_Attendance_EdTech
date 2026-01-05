import express from "express";
import authRoutes from "./authRoutes";
import sessionRoutes from "./sessionRoutes";
import attendanceRoutes from "./attendanceRoutes";
import classeRoutes from "./classeRoutes";
import subjectRoutes from "./subjectRoutes";
import userRoutes from "./userRoutes";
import { authenticate, roleMiddleware } from "../middlewares/auth";
import { Role } from "../../../shared";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/sessions", authenticate, sessionRoutes);
router.use("/attendances", authenticate, attendanceRoutes);
router.use("/classes", authenticate, classeRoutes);
router.use("/subjects", authenticate, roleMiddleware(Role.ADMIN), subjectRoutes);
router.use("/users", authenticate, userRoutes);

export default router;