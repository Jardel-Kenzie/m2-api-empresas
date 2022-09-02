import Company from "../database/models/company.js"
import Sector from "../database/models/sector.js"

const listFilteredCompaniesService = async (sector) => {

    return await Company.findAll({
        include: {
            model: Sector,
            as: "sectors",
            where: { description: sector }
        },
        attributes: {
            exclude: ["sector_uuid"]
        }
    })
}

export default listFilteredCompaniesService