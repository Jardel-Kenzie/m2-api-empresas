import { Router } from "express";
import AuthenticateUser from "../controllers/authenticateUserController.js";
import CreateUsers from "../controllers/createUserController.js";

const router = Router();

router.post("/register/user", CreateUsers.executeUser)
router.post("/register/admin", CreateUsers.executeAdminUser)
router.post("/login", AuthenticateUser.execute)

export default router