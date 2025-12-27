import express from "express";
import authRoutes from "./authRoutes";
import sessionRoutes from "./sessionRoutes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/session", sessionRoutes);

export default router;