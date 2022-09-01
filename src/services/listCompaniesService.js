import Company from "../database/models/company.js"
import Group from "../database/models/group.js"
import Sector from "../database/models/sector.js"

const listCompaniesService = async () => {
    return await Company.findAll({
        include: [{
            model: Group,
            as: "groups",
        },
        {
            model: Sector,
            as: "sectors",
        }
    ],
        attributes: {
            exclude: ["group_uuid", "sector_uuid"]
        }
    })
}

export default listCompaniesService