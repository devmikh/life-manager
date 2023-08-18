import { Model, DataTypes } from 'sequelize'
import sequelize from '../config/sequelize'

class User extends Model {
    public id!: number
    public username!: string
    public password!: string
}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
}, {
    tableName: 'users',
    sequelize,
    timestamps: true,
    underscored: true
})

User.sync()

export default User