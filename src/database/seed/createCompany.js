import Company from "../models/company.js"

const createCompany = async (sector_uuid, group_uuid, name) => {
    return await Company.create({
        name,
        opening_hours: "09:00",
        branch_activity: "18:00",
        sector_uuid,
        group_uuid
    })
}

export default createCompany