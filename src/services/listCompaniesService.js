import Company from "../database/models/company.js"
import Sector from "../database/models/sector.js"

//import Group from "../database/models/group.js"
const listCompaniesService = async () => {
    return await Company.findAll({
        include: [
        {
            model: Sector,
            as: "sectors",
        }
    ],
        attributes: {
            exclude: ["sector_uuid"]
        }
    })
}

export default listCompaniesService