import Sequelize, { Model } from "sequelize"

class Department extends Model {
    static init(sequelize) {
        super.init({
            uuid: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false
            },
            is_admin: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            company_uuid: {
                type: Sequelize.UUID,
                allowNull: false,
                references: { model: "companies", key: "uuid"},
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            },
            manager_uuid: {
                type: Sequelize.UUID,
                allowNull: false,
                references: { model: "users", key: "uuid"},
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            }
        }, {
            timestamps: false,
            tableName: "departments",
            sequelize
        })
    }

    static associate(models) {
        this.belongsToMany(models.Company, { foreignKey: "company_uuid", as: "companies" })
        this.belongsToMany(models.User, { foreignKey: "user_uuid", as: "user" })
    }
}

export default Department