import listCompanyDepartmentsService from "../services/listCompanyDepartmentsService.js"
import pkgJwt from 'jsonwebtoken'
const { verify } = pkgJwt

const listCompanyDepartmentsController = async (request, response) => {
    const [, token] = request.headers.authorization.split(" ")

    const uuid = verify(token, "kenzie", (_, decoded) => {
        return decoded.uuid
    })

    try{
        const departments = await listCompanyDepartmentsService(uuid)
        
        return response.json(departments)
    }catch(er){
        return response.status(400).json({error: "you don't belong to a department"})
    }

}


export default listCompanyDepartmentsController