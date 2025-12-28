import express from "express"
import { getAllStudents } from "../controllers/userController";

const router = express.Router();

router.get("/", getAllStudents);

export default router;