const express = require('express')
const dotenv = require('dotenv')
const dbConfig = require('../knexfile')[process.env.NODE_ENV || 'development']
const knex = require('knex')(dbConfig)
dotenv.config()

const app = express()

const PORT = process.env.PORT || 8080
const THRESHOLD = process.env.THRESHOLD || 8000

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})

app.get('/unlock', async (req, res) => {
  const result = await hasEnoughTimePassed(THRESHOLD)
  if (result.success) {
    await addUnlock(true)
  }
  res.status(200).json(result)
})

async function hasEnoughTimePassed(threshold) {
  if (typeof threshold !== 'number') {
    throw new Error('bad threshold')
  }
  const last = await getTimeOfLastSuccessful()
  const timeSinceLastSuccessful = +new Date() - new Date(last)
  return {
    success: timeSinceLastSuccessful > threshold,
    wait: timeSinceLastSuccessful > threshold ? null : (threshold - timeSinceLastSuccessful) / 1000,
  }
}

async function getTimeOfLastSuccessful() {
  return (await knex.raw(
    `SELECT u1.created_at latest
  FROM unlocks AS u1 
  JOIN (SELECT MAX(id) id FROM unlocks WHERE success = true) AS u2
  ON u1.id = u2.id;`,
  )).rows[0].latest
}

async function addUnlock(success) {
  if (typeof success !== 'boolean') {
    throw new Error('bad input to addUnlock')
  }
  return !!(await knex.raw(`INSERT INTO unlocks (success,  id) VALUES (?, DEFAULT);`, [success]))
    .rowCount
}
