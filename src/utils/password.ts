import bcrypt from 'bcrypt'

async function validatePassword(password: string, hashedPassword: string) {
    const validPassword = await bcrypt.compare(password, hashedPassword)
    return validPassword
}

async function hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
}

export {
    validatePassword,
    hashPassword
}