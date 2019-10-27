module.exports = require('knex')({
  client: 'postgresql',
  connection: process.env.CONNECTION_STRING,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: 'db/migrations',
  },
  seeds: {
    directory: 'db/seeds',
  },
})
