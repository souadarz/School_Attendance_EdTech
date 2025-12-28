import express from "express"
import { getAllClasses } from "../controllers/classesController";

const router = express.Router();

router.get("/", getAllClasses);

export default router;