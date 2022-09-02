import { Router } from "express";
import AdminController from "../controllers/adminController.js";


const router = Router();

router.get("/departments", AdminController.getDepartments)
router.get("/outOfWork", AdminController.getOutOfWork)
router.post("/company", AdminController.createCompany)


export default router