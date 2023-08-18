import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import User from '../../models/user'
import { validatePassword } from '../../utils/password'

// Define passport local strategy
passport.use(new LocalStrategy({ usernameField: 'username'}, (username, password, done) => {
    User.findOne({where: {username: username}})
        .then(async (user) => {
            if (!user) {
                return done(null, false, { message: "Incorrect username" })
            }
            const validPassword = await validatePassword(password, user.password)
            if (!validPassword) {
                return done(null, false, { message: "Incorrect password" })
            } else {
                return done(null, user)
            }
            
        })
        .catch(error => done(error))
}))

passport.serializeUser((user: any, done) => {
    done(null, user.id)
})

passport.deserializeUser((id: number, done) => {
    User.findByPk(id)
      .then((user) => done(null, user))
      .catch((err) => done(err))
})

export default passport