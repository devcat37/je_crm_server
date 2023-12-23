require('dotenv').config()

const express = require('express')
const sequelize = require('./db')
const cors = require('cors')

const models = require('./models/models')

const PORT = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json({'eblan': true})
})

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
