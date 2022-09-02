import { Router } from "express";
import AdminController from "../controllers/adminController.js";
import Helper from "../services/helper.js";


const router = Router();

router.get("/departments", AdminController.getDepartments)
router.get("/sectors", AdminController.getSectors)
router.get("/outOfWork", AdminController.getOutOfWork)
router.post("/company", Helper.valideBody, AdminController.createCompany)
router.post("/sectors", Helper.valideBody, AdminController.createSector)
router.post("/departments", Helper.valideBody, AdminController.createDepartment)
router.patch("/engage", Helper.valideBody, AdminController.createEngage)
router.patch("/dismiss/:user_uuid", AdminController.deleteDepartmentForUser)



export default router