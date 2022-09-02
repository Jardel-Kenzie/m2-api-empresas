import listUserDepartmentsService from "../services/listUserDepartmentsService.js"
import pkgJwt from 'jsonwebtoken'

const { verify } = pkgJwt

const listUserDepartmentsController = async (request, response) => {
    const [, token] = request.headers.authorization.split(" ")

    const uuid = verify(token, "kenzie", (_, decoded) => {
        return decoded.uuid
    })

    const departments = await listUserDepartmentsService(uuid)

    return response.json(departments)
} 

export default listUserDepartmentsController