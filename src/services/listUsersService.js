import User from "../database/models/user.js"

const listUsersService = async () => {
    const users = await User.findAll()

    return users
}

export default listUsersService