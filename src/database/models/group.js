/*import Sequelize, { Model } from "sequelize"

class Group extends Model {
    static init(sequelize) {
        super.init({
            uuid: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            group_name: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "group_name not empty!"
                    },
                    notNull: {
                        msg: "group_name is required!"
                    }
                }
            }
        }, {
            timestamps: false,
            tableName: "groups",
            sequelize
        })
    }

    static associate(models) {
        this.hasMany(models.Company, { foreignKey: "group_uuid", as: "companies" })
    }
}


export default Group*/