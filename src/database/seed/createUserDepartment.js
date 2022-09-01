import UserDepartment from "../models/userDepartment.js"

const createUserDepartment = async (user_uuid, department_uuid) => {
    return await UserDepartment.create({
        user_uuid,
        department_uuid
    })
}

export default createUserDepartment