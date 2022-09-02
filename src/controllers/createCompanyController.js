import createCompanyService from "../services/createCompanyService.js"

const createCompanyController = async (request, response) => {
    const { name, opening_hours, description, sector_uuid } = request.body

    const company = await createCompanyService(name, opening_hours, description, sector_uuid, response)

    return response.json(company)
}

export default createCompanyController