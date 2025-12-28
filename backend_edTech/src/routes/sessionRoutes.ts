import express from "express"
import { createSession, deleteSession, getAllSession, getSessionById, updateSession } from "../controllers/sessionController";
import { roleMiddleware } from "../middlewares/auth";
import { Role } from "../../../shared";

const router = express.Router();

router.get("/", roleMiddleware(Role.ADMIN), getAllSession);
router.post("/", roleMiddleware(Role.ADMIN), createSession);
router.put("/:id", roleMiddleware(Role.ADMIN), updateSession);
router.get("/:id", getSessionById);
router.delete("/:id", roleMiddleware(Role.ADMIN), deleteSession);

export default router;