import { Router } from "express";
import AdminController from "../controllers/adminController.js";
import updateDepartmentController from "../controllers/updateDepartmentController.js";
import AuthToken from "../middlewares/authToken.js";
import Helper from "../services/helper.js";


const router = Router();

router.get("", AdminController.getDepartments) // correct
router.get("/:company", AdminController.getDepartmentsByCompany) // correct
router.post("", Helper.valideBody, AdminController.createDepartment) //correct
router.patch("/hire", Helper.valideBody, AdminController.createEngage) //correct
router.patch("/:department_uuid", AuthToken.isAdmin, Helper.valideBody, updateDepartmentController) //correct
router.patch("/dismiss/:user_uuid", AdminController.deleteDepartmentForUser) //correct
router.delete("/:department", AdminController.deleteDepartment) // correct

export default router