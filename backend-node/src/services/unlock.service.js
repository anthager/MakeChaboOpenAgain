const knex = require('../../knexfile')

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
  const result = (await knex.raw(
    `SELECT u1.created_at latest
		FROM unlocks AS u1 
		JOIN (SELECT MAX(id) id FROM unlocks WHERE success = true) AS u2
		ON u1.id = u2.id;`,
  )).rows[0]
  return result && result.latest
}

async function addUnlock(success) {
  if (typeof success !== 'boolean') {
    throw new Error('bad input to addUnlock')
  }
  return !!(await knex.raw(`INSERT INTO unlocks (success,  id) VALUES (?, DEFAULT);`, [success]))
    .rowCount
}

module.exports = { hasEnoughTimePassed, getTimeOfLastSuccessful, addUnlock }
