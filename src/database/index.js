import UserDepartment from "./models/userDepartment.js"
import Department from "./models/department.js"
import Company from "./models/company.js"
import Sector from "./models/sector.js"
import Group from "./models/group.js"
import Sequelize from "sequelize"
import User from "./models/user.js"

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

User.associate(database.models)
Group.associate(database.models)
Sector.associate(database.models)
Department.associate(database.models)
Company.associate(database.models)
UserDepartment.associate(database.models)

export default database