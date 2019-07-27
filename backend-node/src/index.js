const express = require('express')
const dotenv = require('dotenv')
const router = require('./router')
const configService = require('./config')
configService.load()
const config = configService.config

const app = express()
const PORT = process.env.PORT || 8080

dotenv.config()

app.use(router)

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
  console.log(`using config:\n`, config)
})

module.exports = app
