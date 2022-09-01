import Company from "../models/company.js"

const createCompany = async (sector_uuid, group_uuid, name, description) => {
    return await Company.create({
        name,
        opening_hours: "09:00",
        description,
        sector_uuid,
        group_uuid
    })
}

export default createCompany