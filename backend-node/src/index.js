const express = require('express')
const dotenv = require('dotenv')
const router = require('./router')

dotenv.config()

const app = express()
app.use(router)
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})

module.exports = app
