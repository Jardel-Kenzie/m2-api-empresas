import Sequelize, { Model } from "sequelize"

class Company extends Model {
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
                opening_hours: {
                    type: Sequelize.TIME,
                    allowNull: false
                },
                branch_activity: {
                    type: Sequelize.TIME,
                    allowNull: false
                },
                sector_uuid: {
                    type: Sequelize.UUID,
                    allowNull: false,
                    references: { model: "sectors", key: "uuid"},
                    onUpdate: "CASCADE",
                    onDelete: "CASCADE"
                },
                group_uuid: {
                    type: Sequelize.UUID,
                    allowNull: false,
                    references: { model: "groups", key: "uuid"},
                    onUpdate: "CASCADE",
                    onDelete: "CASCADE"
                }
            }, {
                timestamps: false,
                tableName: "companies",
                sequelize
            })
    }

    static associate(models){
        this.hasOne(models.Sector, { foreignKey: "sector_uuid", as: "sectors" })
        this.hasOne(models.Department, { foreignKey: "department_uuid", as: "department" })
        this.belongsTo(models.Group, { foreignKey: "group_uuid", as: "groups" })
    }
}

export default Company