import Department from "../database/models/department.js"
import Company from "../database/models/company.js"
import User from "../database/models/user.js"

const listCompanyDepartmentsService = async (uuid) => {
    return await User.findByPk(uuid)
            .then(res => Department.findOne({
                where: { uuid: res.department_uuid}
            }))
            .then(res => Company.findByPk(res.company_uuid, {
                include: {
                    model: Department,
                    as: "departments"
                }
            }))
}

export default listCompanyDepartmentsService