const express = require('express')
const sequelize = require('sequelize')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/user.route.js')
const db = require('./models')
const PORT = 8080

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

db.sequelize.sync({ force: false }).then(() => {
    console.log("db has been re sync")
})

app.use('/api/users', userRoutes)

app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));