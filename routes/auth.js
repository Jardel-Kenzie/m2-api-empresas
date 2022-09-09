import { Router } from "express";
import AuthenticateUser from "../controllers/authenticateUserController.js";
import CreateUsers from "../controllers/createUserController.js";

const router = Router();

router.post("/register/user", CreateUsers.executeUser) // corect
router.post("/login", AuthenticateUser.execute) // correct

export default router