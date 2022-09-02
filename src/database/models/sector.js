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
                validate: {
                    customValidate(value){
                        if(!["Alimenticio","Varejo","Textil","Manufatura","Aeroespacial", "Automotiva", "TI", "Atacado"].includes(value)){
                            throw new Error("description must be one of these: Alimenticio, Varejo, Textil, Manufatura, Aeroespacial, Automotiva, TI, Atacado")
                        }
                    },
                    notNull: {
                        msg: "description is required!"
                    }
                }
            }
        }, {
            timestamps: false,
            tableName: "sectors",
            sequelize
        })
    }

    static associate(models) {
        this.hasMany(models.Company,{ foreignKey: "sector_uuid", as: "companies" })
    }
}

export default Sector