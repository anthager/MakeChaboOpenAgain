module.exports = require('knex')(
  {
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

    test: {
      client: 'postgresql',
      connection: {
        database: 'make_chabo_open_again_test',
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
        directory: 'db/seeds-test',
      },
    },

    staging: {
      client: 'postgresql',
      connection: {
        database: 'make_chabo_open_again_staging',
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
        database: 'make_chabo_open_again_prod',
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
  }[process.env.NODE_ENV],
)
