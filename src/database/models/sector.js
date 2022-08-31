import Sequelize, { Model } from "sequelize"

class Sector extends Model {
    static init(sequelize) {
        super.init({
            uuid: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false,
            }
        }, {
            timestamps: false,
            tableName: "sectors",
            sequelize
        })
    }

    static associate(models) {
        this.belongsToMany(models.Company,{ foreignKey: "company_uuid", as: "companies" })
    }
}

export default Sector