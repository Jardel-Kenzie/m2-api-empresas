import Company from "../models/company.js"

const createCompany = async (sector_uuid, name, description) => {
    return await Company.create({
        name,
        opening_hours: "09:00",
        description,
        sector_uuid
    })
}

export default createCompany