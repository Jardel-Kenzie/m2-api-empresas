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
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "name not empty!"
                    },
                    notNull: {
                        msg: "name is required!"
                    }
                    
                }
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "description not empty!"
                    },
                    notNull: {
                        msg: "description is required!"
                    }
                }
            },
            company_uuid: {
                type: Sequelize.UUID,
                allowNull:false,
                validate: {
                    notEmpty: {
                        msg: "company_uuid not empty!"
                    },
                    notNull: {
                        msg: "company_uuid is required!"
                    }
                },
                references: { model: "companies", key: "uuid"},
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            },/*
            manager_uuid: {
                type: Sequelize.UUID,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "manager_uuid not empty!"
                    },
                    notNull: {
                        msg: "manager_uuid is required!"
                    }
                },
                references: { model: "users", key: "uuid"},
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            }*/
        }, {
            timestamps: false,
            tableName: "departments",
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.Company, { foreignKey: "company_uuid", as: "companies" })
        this.hasMany(models.User, {foreignKey: "department_uuid", as: "users"})
        //this.belongsTo(models.User, { foreignKey: "manager_uuid", as: "users" })
        //this.hasMany(models.UserDepartment, { foreignKey: "department_uuid", as: "users_departments" })
    }
}

export default Department