import { Router } from "express";
import AdminController from "../controllers/adminController.js";
import Helper from "../services/helper.js";


const router = Router();

router.get("", AdminController.getSectors)

export default router