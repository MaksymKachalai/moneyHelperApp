// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const { HttpError } = require("../../helpers/httpError");

// const userLogin = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email: email });
//   if (!user) {
//     throw HttpError(404, 'User not found');
//   }
//   const isPassword = await bcrypt.compare(password, user.password);
//   if (!isPassword) {
//     throw HttpError(404, 'Uncorrect password');
//   }
//   const token = jwt.sign({ data: user._id }, process.env.SECRET_KEY, {
//     expiresIn: '24h',
//   });
//   user.token = token;
//   const updatedUser = await user.save();
//   res.json({
//     user: {
//       userId: updatedUser._id,
//       login: updatedUser.login,
//       email: updatedUser.email,
//     },
//     token: updatedUser.token,
//   });
// };

// module.exports = {
//   userLogin,
// };
