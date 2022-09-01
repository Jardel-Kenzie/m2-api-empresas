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
                    allowNull: {
                        msg: "required field name!"
                    },
                    validate: {
                        notEmpty: {
                            msg: "name not empty!"
                        }
                    }
                },
                opening_hours: {
                    type: Sequelize.TIME,
                    allowNull: {
                        msg: "required field opening_hours!"
                    },
                    validate: {
                        notEmpty: {
                            msg: "opening_hours not empty!"
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
                sector_uuid: {
                    type: Sequelize.UUID,
                    allowNull: {
                        msg: "required field sector_uuid!"
                    },
                    validate: {
                        notEmpty: {
                            msg: "sector_uuid not empty!"
                        },
                    },
                    references: { model: "sectors", key: "uuid"},
                    onUpdate: "CASCADE",
                    onDelete: "CASCADE"
                },
                group_uuid: {
                    type: Sequelize.UUID,
                    allowNull: {
                        msg: "required field group_uuid!"
                    },
                    validate: {
                        notEmpty: {
                            msg: "group_uuid not empty!"
                        },
                    },
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