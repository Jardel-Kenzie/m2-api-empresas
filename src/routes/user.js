import { Router } from "express"
import { getProfile } from "../controllers/getProfireUser.js"

import listCompanyDepartmentsController from "../controllers/listCompanyDepartmentsController.js"
import listUserDepartmentsController from "../controllers/listUserDepartmentsController.js"
import listUsersController from "../controllers/listUsersController.js"
import {updateUserController} from "../controllers/updateUserController.js"
import AuthToken from "../middlewares/authToken.js"

const usersRouter = Router()

usersRouter.get("", AuthToken.tokenBasic, AuthToken.isAdmin, listUsersController)
usersRouter.patch("", AuthToken.tokenBasic, AuthToken.hasBasicToken, updateUserController)
usersRouter.get("/profile", AuthToken.tokenBasic, AuthToken.hasBasicToken, getProfile)
usersRouter.get("/departments/coworkers", AuthToken.tokenBasic, AuthToken.hasBasicToken, listUserDepartmentsController)
usersRouter.get("/departments", AuthToken.tokenBasic, AuthToken.hasBasicToken, listCompanyDepartmentsController)

export default usersRouter