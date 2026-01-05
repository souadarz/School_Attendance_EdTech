import express from "express"
import { getAllSubjects } from "../controllers/subjectController";

const router = express.Router();

router.get("/", getAllSubjects);

export default router;