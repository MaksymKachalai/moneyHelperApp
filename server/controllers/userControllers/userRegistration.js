const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { dbQuery } = require('../../db');
const { HttpError } = require('../../helpers/httpError');

const { SECRET_KEY } = process.env;

const saltRounds = 10;

const userRegistration = async (req, res) => {
  const { login, email, password } = req.body;

  const user = await dbQuery(`SELECT * FROM users WHERE email = $1`, [email]);

  if (user.rows.length > 0) {
    throw HttpError(409, 'Email has already been used');
  }

  const cryptedPassword = await bcrypt.hash(password, saltRounds);

  const createdUser = await dbQuery(
    'INSERT INTO users(login_name, email,password) VALUES($1,$2,$3) RETURNING user_id',
    [login, email, cryptedPassword]
  );

  const token = jwt.sign({ userId: createdUser.rows[0].user_id }, SECRET_KEY, {
    expiresIn: '2h',
  });

  res.status(201).json({
    user: {
      login_name: login,
      email,
    },
    token,
  });
};

module.exports = {
  userRegistration,
};
