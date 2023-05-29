const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'financedb',
  user: 'admin',
  password: 'az53az69az71az',
});

pool.connect();

module.exports = { pool };
