const { pool } = require('../../db/dbConnection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { HttpError } = require('../../helpers/httpError');

const saltRounds = 10;

const userRegistration = async (req, res) => {
  console.log('here');
  const { login, email, password } = req.body;
  const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
  // check if user exist
  if (user.rows[0]) {
    throw HttpError(409, 'Email has already been used');
  }

  const cryptedPassword = await bcrypt.hash(password, saltRounds);
  const token = jwt.sign(login, process.env.SECRET_KEY);
  const createdUser = await pool.query('INSERT INTO users(login_name, email,password) VALUES($1,$2,$3) RETURNING *', [
    login,
    email,
    cryptedPassword,
  ]);

  res.json({
    user: createdUser.rows[0],
    token,
  });
};

module.exports = {
  userRegistration,
};
