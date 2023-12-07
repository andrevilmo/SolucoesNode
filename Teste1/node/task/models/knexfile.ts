const path = require('path');
const fileSqlLite = 'out/database.sqlite';
const filePath = path.resolve(__dirname,fileSqlLite);
console.log( `Local do arquivo do sqllite : ${filePath}`)
module.exports = {

  production: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, './out/database.sqlite')
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    useNullAsDefault: true,
    acquireConnectionTimeout: 1000000,
    pool: {
      min: 0,
      max: 4,
      acquireTimeoutMillis: 300000,
      createTimeoutMillis: 300000,
      destroyTimeoutMillis: 300000,
      idleTimeoutMillis: 30000,
      reapIntervalMillis:1000,
      createRetryIntervalMillis: 2000
    },
  },
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, filePath)
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    useNullAsDefault: true,
    acquireConnectionTimeout: 1000000,
    pool: {
      min: 0,
      max: 4,
      acquireTimeoutMillis: 300000,
      createTimeoutMillis: 300000,
      destroyTimeoutMillis: 300000,
      idleTimeoutMillis: 30000,
      reapIntervalMillis:1000,
      createRetryIntervalMillis: 2000
    },
  }

};