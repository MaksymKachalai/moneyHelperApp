const express = require('express');
const { controllerWrapper } = require('../../helpers/controllerWrapper');
const { userRegistration } = require('../../controllers/userControllers');
// const { tokenValidator } = require('../../middlewares/tokenValidator');
const router = express.Router();

router.post('/registration', controllerWrapper(userRegistration));

module.exports = router;
