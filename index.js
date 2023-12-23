require('dotenv').config()

const express = require('express')
const sequelize = require('./db')
const cors = require('cors')

const models = require('./models/models')
const routerV1 = require('./api/v1/routes/index')

const PORT = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1', routerV1)

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
