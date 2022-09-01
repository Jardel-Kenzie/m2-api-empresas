import Department from "../models/department.js"

const createDepartment = async (name, description, company_uuid, manager_uuid, is_admin=false) => {
    return await Department.create({
        name,
        description,
        company_uuid,
        manager_uuid,
        is_admin
    })
}

export default createDepartment