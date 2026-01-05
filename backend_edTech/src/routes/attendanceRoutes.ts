import express from "express"
import { createAttendance, deleteAttendance, getAllAttendance, getAttendanceById, getSessionAttendance, updateAttendance, updateSessionAttendanceBulk } from "../controllers/attendanceController";

const router = express.Router();

router.get("/", getAllAttendance);
router.post("/", createAttendance);
router.get("/:id", getAttendanceById);
router.get("/sessions/:id", getSessionAttendance);
router.put("/sessions/:id/bulk", updateSessionAttendanceBulk);
router.put("/:id", updateAttendance);
router.delete("/:id", deleteAttendance);

export default router;