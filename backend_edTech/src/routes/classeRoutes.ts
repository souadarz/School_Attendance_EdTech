import express from "express"
import { getAllClasses } from "../controllers/classesController";
import { roleMiddleware } from "../middlewares/auth";
import { Role } from "../../../shared";

const router = express.Router();

router.get("/",roleMiddleware(Role.ADMIN), getAllClasses);

export default router;