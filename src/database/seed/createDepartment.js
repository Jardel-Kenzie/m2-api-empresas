import Department from "../models/department.js"

const createDepartment = async (name, description, company_uuid, manager_uuid) => {
    return await Department.create({
        name,
        description,
        company_uuid,
        manager_uuid
    })
}

export default createDepartment