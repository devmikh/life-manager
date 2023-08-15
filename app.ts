import express from 'express'

// Load env variables
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
})
