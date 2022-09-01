import Sector from "../models/sector.js"

const populateSectors = async () => {
    return await Sector.bulkCreate([
        {
            description: "Alimenticio",
        },
        {
            description: "Varejo"
        },
        {
            description: "Textil"
        },
        {
            description: "Manufatura"
        },
        {
            description: "Aeroespacial"
        },
        {
            description: "Automotiva"
        },
        {
            description: "TI"
        },
        {
            description: "Atacado"
        }
    ])
}

export default populateSectors