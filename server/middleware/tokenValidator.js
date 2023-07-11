const jwt = require('jsonwebtoken');
const { dbQuery } = require('../db');
const { HttpError } = require('../helpers/httpError');

const tokenValidator = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw HttpError(401, 'No authorization header');
  }

  const [bearer, token] = authorization.split(' ');
  if (!bearer || !token) {
    throw HttpError(401, 'No bearer or token');
  }

  try {
    const { userId } = jwt.verify(token, process.env.SECRET_KEY);

    if (!userId) {
      throw HttpError(401, 'token has expired, please login again');
    }
    const oldUser = await dbQuery('SELECT login_name, email FROM users WHERE user_id=$1;', [userId]);
    if (oldUser.rows.length === 0) {
      throw HttpError(401, 'No user found by this token');
    }

    req.user = { ...oldUser.rows[0], userId };
    next();
  } catch (error) {
    error.status = 401;
    next(error);
  }
};

module.exports = {
  tokenValidator,
};
