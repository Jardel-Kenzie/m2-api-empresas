import { Router } from "express";
import AuthenticateUser from "../controllers/authenticateUserController.js";
import CreateUsers from "../controllers/createUserController.js";
import AuthToken from "../middlewares/authToken.js";

const router = Router();

router.post("/register", CreateUsers.executeUser)
router.post("/login", AuthenticateUser.execute) 
router.get("/validate_user", AuthToken.validateUser)

export default router