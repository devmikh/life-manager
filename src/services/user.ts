import User from '../models/user'
import sequelize from '../config/sequelize'
import { UserInterface }  from '../interfaces/index'
import { hashPassword } from '../utils/password'
import { selectUserQuery } from '../config/sequelize/queries'

const createUser = async (user: UserInterface) => {
    // Hash password
    const hashedPassword = await hashPassword(user.password)

    // Create new user object
    try {
        const newUser = await User.create({
            username: user.username,
            password: hashedPassword
        })
        return {
            newUser,
            error: null
        }
    } catch (error: any) {
        return {
            user: null,
            error: error
        }
    }
};

const fetchUser = async (userId: number) => {
    try {
        const [ user ] = await sequelize.query(selectUserQuery, { replacements: [userId]})
        
        if (user[0]) {
            return {
                user: user[0],
                error: null
            }
        } else {
            return {
                user: null,
                error: "user_not_found"
            }
        }
    } catch (error: any) {
        return {
            user: null,
            error: error.message
        }
    }
}

export {
    createUser,
    fetchUser
}
