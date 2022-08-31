import Sequelize, { Model } from "sequelize"

class User extends Model {
    static init(sequelize) {
        super.init({
            uuid: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false 
            },
            professional_level: {
                type: Sequelize.STRING,
                allowNull: false
            },
            kind_of_work: {
                type: Sequelize.STRING,
                allowNull: false
            },
            is_admin: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            }
        }, {
            timestamps: false,
            tableName: "users",
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.Company, { foreignKey: "company_uuid", as: "company" })
        this.belongsToMany(models.Department, { foreignKey: "department_uuid", as: "department" })
    }
}

export default User