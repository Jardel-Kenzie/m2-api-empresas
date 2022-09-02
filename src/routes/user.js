import { Router } from "express"

import listCompanyDepartmentsController from "../controllers/listCompanyDepartmentsController.js"
import listUserDepartmentsController from "../controllers/listUserDepartmentsController.js"
import listUsersController from "../controllers/listUsersController.js"
import AuthToken from "../middlewares/authToken.js"

const usersRouter = Router()

usersRouter.get("", listUsersController)
usersRouter.get("/departments/coworkers", AuthToken.hasBasicToken, listUserDepartmentsController)
usersRouter.get("/departments", AuthToken.hasBasicToken, listCompanyDepartmentsController)

export default usersRouter