const { Pool } = require('pg')

const pool = new Pool({
  user: 'imadaouf',
  host: 'localhost',
  database: 'emergify_db',
  port: 5432
})

module.exports = pool