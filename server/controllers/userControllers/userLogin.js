const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { dbQuery } = require('../../db');
const { HttpError } = require('../../helpers/httpError');

const { SECRET_KEY } = process.env;

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const result = await dbQuery('SELECT user_id, password, login_name FROM users WHERE email=$1;', [email]);
  if (result.rows.length === 0) {
    throw HttpError(404, 'User not found');
  }
  const isPassword = await bcrypt.compare(password, result.rows[0].password);

  if (!isPassword) {
    throw HttpError(404, 'Uncorrect password');
  }

  const token = jwt.sign({ userId: result.rows[0].user_id }, SECRET_KEY, {
    expiresIn: '2h',
  });

  res.json({
    user: { login_name: result.rows[0].login_name, email },
    token,
  });
};

module.exports = {
  userLogin,
};
