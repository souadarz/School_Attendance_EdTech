import express from "express"
import { createSession, deleteSession, getAllSession, getMySessions, getSessionById, updateSession } from "../controllers/sessionController";
import { roleMiddleware } from "../middlewares/auth";
import { Role } from "../../../shared";

const router = express.Router();

router.get("/", roleMiddleware(Role.ADMIN), getAllSession);
router.post("/", roleMiddleware(Role.ADMIN), createSession);
router.get("/teachers", roleMiddleware(Role.TEACHER), getMySessions);
router.get("/:id", getSessionById);
router.put("/:id", roleMiddleware(Role.ADMIN), updateSession);
router.delete("/:id", roleMiddleware(Role.ADMIN), deleteSession);

export default router;