import Group from "../models/group.js"

const populateGroups = async () => {
    return await Group.bulkCreate([
        {
            group_name: "NAV companies",
            
        },
        {
            group_name: "Celer group"
        },
        {
            group_name: "KA group"
        }
    ])
}

export default populateGroups