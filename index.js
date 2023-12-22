require('dotenv').config()

const express = require('express')
const sequelize = require('./db')

const PORT = process.env.PORT || 5000
const app = express()

const start = async () => {
    try {
        await sequelize.authenticate()

        app.listen(
            PORT, 
            () => console.log(`Server is listening at port ${PORT}`),
        )
    } catch (error) {
        console.log(error)
    }
}

start()
