import listUsersService from "../services/listUsersService.js"

const listUsersController = async (_, response) => {
    const users = await listUsersService()

    return response.json(users)
}

export default listUsersController