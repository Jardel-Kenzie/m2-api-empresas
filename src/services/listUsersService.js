import UserDepartment from "../database/models/userDepartment.js"
import Department from "../database/models/department.js"
import User from "../database/models/user.js"

const listUsersService = async () => {
    const users = await User.findAll()

    return users
}

export default listUsersService