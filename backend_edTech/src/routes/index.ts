import express from "express";
import authRoutes from "./authRoutes";
import sessionRoutes from "./sessionRoutes";
import attendanceRoutes from "./attendanceRoutes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/session", sessionRoutes);
router.use("/attendance", attendanceRoutes);

export default router;