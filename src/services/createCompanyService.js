import Company from "../database/models/company.js"
import Helper from "./helper.js"

const createCompanyService = async (name, opening_hours, description, sector_uuid, response) => {
    try {
        const createdCompany = await Company.create({
            name,
            opening_hours,
            description,
            sector_uuid
        })
        
        return createdCompany

    } catch({errors}) {
        return response.status(400).json({ error: Helper.organizationErrors(errors)})
    }
}

export default createCompanyService