module.exports = {
  client: 'postgresql',
  connection: process.env.CONNECTION_STRING,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: 'migrations',
  },
  seeds: {
    directory: 'seeds',
  },
}
