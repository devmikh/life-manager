import express from 'express'
import cors from 'cors'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import router from './src/routes'
import passport from './src/config/passport'
const MySQLStore = require('express-mysql-session')(session)

// Load env variables
import dotenv from 'dotenv'
dotenv.config()

// Create app
const app = express()

// Connect middleware
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true
}
app.use(cors(corsOptions))
app.set('trust proxy', 1)
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

/* Session setup */

// Define options for DB connection
const dbOptions = {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
}

const sessionStore = new MySQLStore(dbOptions)

app.use(session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

// Apply passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Connect router
app.use(router)

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
})
