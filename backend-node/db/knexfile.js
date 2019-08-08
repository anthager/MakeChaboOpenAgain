module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'mcoa_dev',
      user: 'mcoa_app',
      password: 'password',
    },
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
  },

  test: {
    client: 'postgresql',
    connection: {
      database: 'mcoa_test',
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
      database: process.env.DB,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
    },
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
  },

  production: {
    client: 'postgresql',
    connection: {
      database: process.env.DB,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
    },
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
  },
}
