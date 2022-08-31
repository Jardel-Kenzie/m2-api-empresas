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
                allowNull: false,
                references: { model: "users", key: "uuid"},
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            },
            department_uuid: {
                type: Sequelize.UUID,
                allowNull: false,
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
        this.belongsToMany(models.User, { foreignKey: "user_uuid", as: "user" })
        this.belongsToMany(models.Department, { foreignKey: "department_uuid", as: "department" })
    }
}

export default UserDepartment