const express = require('express')
const router = require('./router')
const configService = require('./config')
const knex = require('../db/knex')
const reconnectInterval = 5000

configService.load()
const config = configService.config

const app = express()
const PORT = process.env.PORT || 8080

app.use(router)
app.get('/', (req, res) => {
  res.status(200).json('Quite alright thanks')
})

if (process.env.NODE_ENV !== 'test') {
  ;(async () => {
    await isDatabaseUp()
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`)
      console.log(`using config:\n`, config)
    })
  })()
}

async function isDatabaseUp() {
  return new Promise(async res => {
    try {
      console.log('attempting to connect to database...')
      await knex.raw('SELECT * FROM unlocks;')
      console.log('connected to database successfully')
      return res('nice')
    } catch (err) {
      console.log(
        `connecting to database failed, attempting to reconnect in ${reconnectInterval}ms...`,
      )
      setTimeout(isDatabaseUp, reconnectInterval)
    }
  })
}

module.exports = app
