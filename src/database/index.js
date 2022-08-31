import UserDepartment from "./models/userDepartment"
import Department from "./models/department"
import Company from "./models/company"
import Sector from "./models/sector"
import Group from "./models/group"
import Sequelize from "sequelize"
import User from "./models/user"

const config = {
    dialect: 'sqlite',
    storage: './database.sqlite'
}

const database = new Sequelize(config)

User.init(database)
Group.init(database)
Sector.init(database)
Department.init(database)
Company.init(database)
UserDepartment.init(database)

export default database