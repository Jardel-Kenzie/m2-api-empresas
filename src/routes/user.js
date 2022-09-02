import { Router } from "express"

import listCompanyDepartmentsController from "../controllers/listCompanyDepartmentsController.js"
import listUserDepartmentsController from "../controllers/listUserDepartmentsController.js"
import listUsersController from "../controllers/listUsersController.js"
import {updateUserController} from "../controllers/updateUserController.js"
import AuthToken from "../middlewares/authToken.js"

const usersRouter = Router()

usersRouter.get("", AuthToken.isAdmin, listUsersController)
usersRouter.patch("", AuthToken.hasBasicToken, updateUserController)
usersRouter.get("/departments/coworkers", AuthToken.hasBasicToken, listUserDepartmentsController)
usersRouter.get("/departments", AuthToken.hasBasicToken, listCompanyDepartmentsController)

export default usersRouter