import Company from "../database/models/company.js"

const listCompaniesService = () => {
    return Company.findAll()
}

export default listCompaniesService