import { Router } from "express"

import listUsersController from "../controllers/listUsersController.js"

const usersRouter = Router()

usersRouter.get("", listUsersController)

export default usersRouter