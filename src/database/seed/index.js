import database from "../index.js"
import createCompany from "./createCompany.js"
import createDepartment from "./createDepartment.js"
import populateSectors from "./populateSectors.js"
import populateUsers from "./populateUsers.js"

//import populateGroups from "./populateGroups.js"
//import createUserDepartment from "./createUserDepartment.js"

(async () => {

    try {
        await database.sync()
        const users = await populateUsers()
       // const groups = await populateGroups()
        const sectors = await populateSectors()
        
        createCompany(sectors[0].uuid, "Skina Lanches", "Podrão de qualidade")
        createCompany(sectors[0].uuid, "Gela Guela", "Sorvetes barateza")

        createCompany(sectors[5].uuid, "Boacharria", "Se furar o pneu, conta comigo")
        createCompany(sectors[5].uuid, "Offcina", "Arrumamos seu carro")

        const nerdLab = await createCompany(sectors[6].uuid, "Nerd lab", "Criamos um site rapidão pra você")
        createCompany(sectors[6].uuid, "Chipset manutenções", "Arrumamos o PC")


        const ti = await createDepartment("TI", "Departamento de TI", nerdLab.uuid, users[1].uuid)
        const rh = await createDepartment("RH", "Recrutamento e seleção", nerdLab.uuid, users[2].uuid)

       /* for(let i = 1; i < users.length; i++) {
            if(i < 4){
                createUserDepartment(users[i].uuid, ti.uuid)
            } else {
                createUserDepartment(users[i].uuid, rh.uuid)
            }
        }*/

    } catch (error) {
        console.log(error)
    }
})();