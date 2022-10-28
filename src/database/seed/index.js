import database from "../index.js"
import createCompany from "./createCompany.js"
import createDepartment from "./createDepartment.js"
import populateSectors from "./populateSectors.js"
import populateUsers from "./populateUsers.js"


(async () => {

    try {
        await database.sync()
        const users = await populateUsers()
       // const groups = await populateGroups()
        const sectors = await populateSectors()
        
        createCompany(sectors[0].uuid, "Skina Lanches", "Podrão de qualidade")
        createCompany(sectors[0].uuid, "Gela Guela", "Sorvetes barateza")

        createCompany(sectors[1].uuid, "Mercado Kenzie", "Padrão de qualidade")
        createCompany(sectors[1].uuid, "Gortifruti da Terra", "Natural e sem agrotóxicos")

        createCompany(sectors[2].uuid, "Tecidos Dona Florinda", "Nossos tecidos são nossos tesouros")
        createCompany(sectors[2].uuid, "Malhas Alberto", "Compre suas roupas de academia aqui! melhor preço da região")

        createCompany(sectors[3].uuid, "DevModa", "Roupas para um estilo de uma pessoa desenvolvedora")
        createCompany(sectors[3].uuid, "Edna Moda", "Roupas de grifes, mas sem capas")

        createCompany(sectors[4].uuid, "KenzieX", "Levando nossos desenvolvedores a outro mundo")
        createCompany(sectors[4].uuid, "Evolution Tech", "Focamos nossos estudos e desenvolvimento em foguetes melhores e mais rapidos!!")

        createCompany(sectors[5].uuid, "Boacharria", "Se furar o pneu, conta comigo")
        createCompany(sectors[5].uuid, "Offcina", "Arrumamos seu carro")

        const nerdLab = await createCompany(sectors[6].uuid, "Nerd lab", "Criamos um site rapidão pra você")
        createCompany(sectors[6].uuid, "Chipset manutenções", "Arrumamos o PC")


        const ti = await createDepartment("TI", "Departamento de TI", nerdLab.uuid, users[1].uuid)
        const rh = await createDepartment("RH", "Recrutamento e seleção", nerdLab.uuid, users[2].uuid)

        createCompany(sectors[7].uuid, "Mercado Popular", "Melhor preço e qualidade!!")
        createCompany(sectors[7].uuid, "Atacadão Kenzie", "Liquidamos todas as ofertas!!")

    } catch (error) {
        console.log(error)
    }
})();