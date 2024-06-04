// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: 'postgres',
      database: 'gc_binar',
    },
    migrations: {
      directory: './app/migrations'
    },
    seeds: {
      directory: './app/seeds'
    }
  },
};
