import express from 'express'
import cors from 'cors'

import router from './src/routes'

// Load env variables
import dotenv from 'dotenv'
dotenv.config()

const app = express()

// Connect middleware
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Connect router
app.use(router)

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
})
