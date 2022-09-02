import { Router } from "express"

import AuthToken from "../middlewares/authToken.js"

import listCompaniesController from "../controllers/listCompaniesController.js"
import listFilteredCompaniesController from "../controllers/listFilteredCompaniesController.js"
import AdminController from "../controllers/adminController.js"

const companiesRouter = Router()

companiesRouter.get("", listCompaniesController) // correct
companiesRouter.get("/:sector", listFilteredCompaniesController) // correct
companiesRouter.post("",AuthToken.isAdmin, AdminController.createCompany ) // correct


export default companiesRouter