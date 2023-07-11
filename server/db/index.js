const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'financedb',
  user: 'admin',
  password: 'az53az69az71az',
});

const dbQuery = async (text, params) => {
  const res = await pool.query(text, params);

  return res;
};

module.exports = { dbQuery };
