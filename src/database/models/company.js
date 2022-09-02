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
                opening_hours: {
                    type: Sequelize.TIME,
                    allowNull: false,
                    validate: {
                        notEmpty: {
                            msg: "opening_hours not empty!"
                        },
                        notNull: {
                            msg: "opening_hours is required!"
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
                sector_uuid: {
                    type: Sequelize.UUID,
                    allowNull: false,
                    validate: {
                        notEmpty: {
                            msg: "sector_uuid not empty!"
                        },
                        notNull: {
                            msg: "sector_uuid is required!"
                        }
                    },
                    references: { model: "sectors", key: "uuid"},
                    onUpdate: "CASCADE",
                    onDelete: "CASCADE"
                },
                /*
                group_uuid: {
                    type: Sequelize.UUID,
                    allowNull: false,
                    validate: {
                        notEmpty: {
                            msg: "group_uuid not empty!"
                        },
                        notNull: {
                            msg: "group_uuid is required!"
                        }
                    },
                    references: { model: "groups", key: "uuid"},
                    onUpdate: "CASCADE",
                    onDelete: "CASCADE"
                }*/
            }, {
                timestamps: false,
                tableName: "companies",
                sequelize
            })
    }

    static associate(models) {
        //this.belongsTo(models.Group, { foreignKey: "group_uuid", as: "groups" })
        this.belongsTo(models.Sector, { foreignKey: "sector_uuid", as: "sectors" })
        this.hasMany(models.Department, { foreignKey: "company_uuid", as: "departments" })
    }
}

export default Company