const express = require('express')
const dotenv = require('dotenv')
const router = require('./router')

const app = express()
const PORT = process.env.PORT || 8080

dotenv.config()
if (!process.env.PWD) {
  throw new Error('No "PWD" provided')
}

if (!process.env.LOG) {
  throw new Error('No "LOG" provided')
}

if (!process.env.APTUS_URL) {
  throw new Error('No "APTUS_URL" provided')
}

if (!process.env.CSB_URL) {
  throw new Error('No "CSB_URL" provided')
}

app.use(router)

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
  console.log(`using aptus url: ${process.env.APTUS_URL}`)
  console.log(`using csb url: ${process.env.CSB_URL}`)
})

module.exports = app
