import Department from "../database/models/department.js"
import updateDepartmentService from "../services/updateDepartmentService.js"

const updateDepartmentController = async (request, response) => {
    const { name, description } = request.body
    const { department_uuid } = request.params

    const department = await Department.findOne({
        where:{
            uuid: department_uuid
        }
    })

    if(!department){
        return response.status(404).json({error: "department not found"})
    } 

    const updatedDepartment = await updateDepartmentService(name, description, department_uuid, response)

    return response.status(200).json(updatedDepartment) 
}

export default updateDepartmentController 