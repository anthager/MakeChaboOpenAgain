// Update with your config settings.

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'make_chabo_open_again',
      user: 'mcoa_app',
      password: 'password',
    },
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
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'make_chabo_open_again',
      user: 'mcoa_app',
      password: process.env.DB_PASSWORD,
    },
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
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'make_chabo_open_again',
      user: 'mcoa_app',
      password: process.env.DB_PASSWORD,
    },
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
  },
}
