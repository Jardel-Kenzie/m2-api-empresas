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
                allowNull: {
                    msg: "required field email!"
                },
                unique: {
                    msg: "email alread exists!"
                },
                validate: {
                    notEmpty:{
                        msg: "email not empty!"
                    },
                    isUrl: {
                        msg: "email required validate url!"
                    }
                }
            },
            username: {
                type: Sequelize.STRING,
                allowNull: {
                    msg: "required field username!"
                },
                validate: {
                    notEmpty: {
                        msg: "username not empty!"
                    }
                }
            },
            password: {
                type: Sequelize.STRING,
                allowNull: {
                    msg: "required field password!"
                },
                validate: {
                    notEmpty: {
                        msg: "pasword not empty"
                    }
                }
            },
            professional_level: {
                type: Sequelize.STRING,
                allowNull: {
                    msg: "required field professional_level!"
                },
                validate: {
                    customValidate(value){
                        if(!["estágio","júnior","pleno","sênior"].includes(value)){
                            throw new Error("professional_level must be one of these: estágio, júnior, pleno, sênior")
                        }
                    }
                }
            },
            kind_of_work: {
                type: Sequelize.STRING,
                allowNull: {
                    msg: "required field kind_of_work!"
                },
                validate: {
                    customValidate(value){
                        if(!["home office", "presencial", "hibrido"].includes(value)){
                            throw new Error("kind_of_work must be one of these: home office, presencial, hibrido")
                        }
                    }
                }
            },
            is_admin: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: false
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