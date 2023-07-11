const { userLogin } = require("./userLogin");
const { userRegistration } = require('./userRegistration');
const { userCurrentUser } = require('./userCurrentUser');

module.exports = {
  userLogin,
  userRegistration,

  userCurrentUser,
};
