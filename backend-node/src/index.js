const express = require('express')
const dotenv = require('dotenv')
const config = require('../knexfile')[process.env.NODE_ENV || 'development']
const knex = require('knex')(config)
dotenv.config()

const app = express()

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
  console.log('Press Ctrl+C to quit.')
})

app.get('/unlock', async (req, res) => {
  console.log(nice)

  res.status(200).send('cool')
})
