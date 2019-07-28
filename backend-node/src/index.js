const express = require('express')
const router = require('./router')
const configService = require('./config')
configService.load()
const config = configService.config

const app = express()
const PORT = process.env.PORT || 8080

app.use(router)
app.get('/', (req, res) => {
  res.send(200).json('nice')
})

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
    console.log(`using config:\n`, config)
  })
}

module.exports = app
