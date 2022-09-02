import listFilteredCompaniesService from "../services/listFilteredCompaniesService.js"

const listFilteredCompaniesController = async (request, response) => {
    const { sector } = request.params

    if(!sector) {
        return response.status(400).json({message: "sector is required!"})
    }

    const filteredCompanies = await listFilteredCompaniesService(sector)

    return response.json(filteredCompanies)
}

export default listFilteredCompaniesController