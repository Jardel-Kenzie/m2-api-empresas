import Department from "../database/models/department.js"

const updateDepartmentService = async (name, description, department_uuid) => {
    const department = await Department.findByPk(department_uuid)

    return await department.update({
        name: name || department.name,
        description: description || department.description
    })

    
}

export default updateDepartmentService