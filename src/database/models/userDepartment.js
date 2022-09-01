import Sequelize, { Model } from "sequelize"

class UserDepartment extends Model {
    static init(sequelize) {
        super.init({
            uuid: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            user_uuid: {
                type: Sequelize.UUID,
                allowNull: {
                    msg: "required field user_uuid!"
                },
                validate: {
                    notEmpty: {
                        msg: "user_uuid not empty"
                    }
                },
                references: { model: "users", key: "uuid"},
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            },
            department_uuid: {
                type: Sequelize.UUID,
                allowNull: {
                    msg: "required field department_uuid!"
                },
                validate: {
                    notEmpty: {
                        msg: "department_uuid not empty"
                    }
                },
                references: { model: "departments", key: "uuid"},
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            }
        }, {
            timestamps: false,
            tableName: "user_department",
            sequelize
        })
    }

    static associate(models) {
        this.hasOne(models.User, { foreignKey: "user_uuid", as: "user" })
        this.hasOne(models.Department, { foreignKey: "department_uuid", as: "department" })
    }
}

export default UserDepartment