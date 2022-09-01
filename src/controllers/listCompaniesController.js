import listCompaniesService from "../services/listCompaniesService.js"

const listCompaniesController = async (_, response) => {
    const companies = await listCompaniesService()

    return response.json(companies)
}

export default listCompaniesController