// const jwt = require("jsonwebtoken");
// const { User } = require("../models/userModel");
// const { HttpError } = require("../helpers/httpError");

// const tokenValidator = async (req, res, next) => {
//   const { authorization } = req.headers;
//   if (!authorization) {
//     throw HttpError(401, "No authorization header");
//   }
//   const [bearer, token] = authorization.split(" ");
//   if (!bearer || !token) {
//     throw HttpError(401, "No bearer or token");
//   }
//   try {
//     const { data } = jwt.verify(token, process.env.SECRET_KEY);

//     const user = await User.findById(data);
//     if (!user) {
//       throw HttpError(401, "No user found by this token");
//     }
//     const isValidToken = user.token === token;
//     if (!isValidToken) {
//       throw HttpError(401, "token has expired, please login again");
//     }
//     req.user = user;
//     next();
//   } catch (error) {
//     error.status = 401;
//     next(error);
//   }
// };

// module.exports = {
//   tokenValidator,
// };
