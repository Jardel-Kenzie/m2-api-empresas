import listCompanyDepartmentsService from "../services/listCompanyDepartmentsService.js"
import pkgJwt from 'jsonwebtoken'
const { verify } = pkgJwt

const listCompanyDepartmentsController = async (request, response) => {
    const [, token] = request.headers.authorization.split(" ")

    const uuid = verify(token, "kenzie", (_, decoded) => {
        return decoded.uuid
    })

    const departments = await listCompanyDepartmentsService(uuid)

    return response.json(departments)
}


export default listCompanyDepartmentsController