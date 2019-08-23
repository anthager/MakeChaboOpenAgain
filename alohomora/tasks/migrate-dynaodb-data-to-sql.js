const knex = require('../db/knex')
const fs = require('fs').promises

;(async () => {
  await knex.migrate.latest().catch(err => console.error(err) || process.exit(1))
  const path = process.argv[2]
  const rawJson = await fs.readFile(path).catch(err => console.error(err) || process.exit(1))
  let json
  try {
    json = JSON.parse(rawJson)
  } catch (err) {
    console.error('bad json')
    process.exit(1)
  }
  const items = json.Items.map(item => ({
    success: item.success.S,
    created_at: new Date(+item.timestamp.N),
  }))
  const res = await Promise.all(
    items.map(item =>
      knex('unlocks').insert({ success: item.success, created_at: item.created_at }),
    ),
  ).catch(err => console.error(err) || process.exit(1))
  knex.destroy()
  console.log(`${res.length} rows added`)
})()
