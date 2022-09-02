import User from "../database/models/user.js"
import Department from "../database/models/department.js"

const listUserDepartmentsService = async (uuid) => {
    return await User.findByPk(uuid).then(res => Department.findAll({
                where: { uuid: res.department_uuid},
                include: {
                    model: User,
                    as: "users",
                }
            }))
}

export default listUserDepartmentsService