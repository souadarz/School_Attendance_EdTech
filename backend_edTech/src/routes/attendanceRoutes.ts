import express from "express"
import { createAttendance, deleteAttendance, getAllAttendance, getAttendanceById, updateAttendance } from "../controllers/attendanceController";

const router = express.Router();

router.get("/", getAllAttendance);
router.post("/", createAttendance);
router.put("/:id", updateAttendance);
router.get("/:id", getAttendanceById);
router.delete("/:id", deleteAttendance);

export default router;