import database from './database'
import User from './database/models/user'
import Company from './database/models/company'
import Sector from './database/models/sector'
import Group from './database/models/group';

(async () => {

    try {
        const resultado = await database.sync()
        // const primeiroUser = await User.create({
        //     username: "testeeeeeeeee",
        //     email: "teste@maail.com",
        //     password: "1234",
        //     professional_level: "aa",
        //     kind_of_work: "restes",
        //     is_admin: 0
        // })

        // const primeiroSetor = await Sector.create({
        //     description: "Alimenticio"
        // })

        // const primeiraEmpresa = await Group.create({
        //     group_name: "Teste"
        // })

        // const primeiraEmpresa = await Company.create({
        //     name: "Teste",
        //     opening_hours: "09:00",
        //     branch_activity: "8",
        //     sector_uuid: "d33a3a1c-8317-4007-ae8b-e14ba482e86f",
        //     group_uuid: "38cdf3f4-261d-4665-9c6b-a61acfa6cc7c"
        // })

        // const teste = await Sector.findAll({
        //     where: { uuid: "a95dac0e-4cb8-4a5e-860d-c7d6e54e7d50" },
        //     include: [{ model: Company, as: "companies" }]
        // })

        // console.log("VVVVVVVVVVVVVVVVVVVVVVVV")
        // console.log(teste)

    } catch (error) {
        console.log(error)
    }
})();