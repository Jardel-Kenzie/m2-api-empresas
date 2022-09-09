import { Router } from "express";
import AdminController from "../controllers/adminController.js";
import { updateUserForAdminController } from "../controllers/updateUserController.js";
import Helper from "../services/helper.js";



const router = Router();

router.get("/out_of_work", AdminController.getOutOfWork)
router.patch("/update_user/:user_uuid",  Helper.valideBody, updateUserForAdminController)
router.delete("/delete_user/:user_uuid", AdminController.deleteUser)

export default router