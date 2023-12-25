#!/usr/bin/env node

require('dotenv').config()

const express = require('express')
const sequelize = require('./db')
const cors = require('cors')

const models = require('./models/models')
const routerV1 = require('./api/v1/routes/index')

const errorHandler = require('./api/middlewares/error_handling_middleware')
const responseFormater = require('./api/middlewares/response_formating_middleware')

const PORT = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1', routerV1)

// Форматирование ответа.
app.use(responseFormater)

// После всех app.use
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()

        app.listen(
            PORT,
            () => console.log(`Server is listening at port ${PORT}`),
        )
    } catch (error) {
        console.log(error)
    }
}

start()
