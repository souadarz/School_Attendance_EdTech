import express from "express"
import { createSession, deleteSession, getAllSession, getSessionById, updateSession } from "../controllers/SessionController";

const router = express.Router();

router.get("/", getAllSession);
router.post("/", createSession);
router.put("/:id", updateSession);
router.get("/:id", getSessionById);
router.delete("/:id", deleteSession);

export default router;