import { Router } from "express"

import authToken from "../middlewares/authToken.js"

import createCompanyController from "../controllers/createCompanyController.js"
import listCompaniesController from "../controllers/listCompaniesController.js"
import listFilteredCompaniesController from "../controllers/listFilteredCompaniesController.js"

const companiesRouter = Router()

companiesRouter.get("", listCompaniesController)
companiesRouter.get("/:sector", listFilteredCompaniesController)
companiesRouter.post("", authToken.isAdmin ,createCompanyController)

export default companiesRouter