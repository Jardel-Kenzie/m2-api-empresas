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
                allowNull: {
                    msg: "required field name!"
                },
                validate: {
                    notEmpty: {
                        msg: "name not empty!"
                    }
                }
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: {
                    msg: "required field description!"
                },
                validate: {
                    notEmpty: {
                        msg: "description not empty!"
                    }
                }
            },
            company_uuid: {
                type: Sequelize.UUID,
                allowNull: {
                    msg: "required field company_uuid!"
                },
                validate: {
                    notEmpty: {
                        msg: "company_uuid not empty!"
                    },
                },
                references: { model: "companies", key: "uuid"},
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            },
            manager_uuid: {
                type: Sequelize.UUID,
                allowNull: {
                    msg: "required field manager_uuid!"
                },
                validate: {
                    notEmpty: {
                        msg: "manager_uuid not empty!"
                    },
                },
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
        this.belongsTo(models.Company, { foreignKey: "company_uuid", as: "companies" })
        this.hasOne(models.User, { foreignKey: "manager_uuid", as: "user" })
    }
}

export default Department