const express = require('express');
const { controllerWrapper } = require('../../helpers/controllerWrapper');
const { userRegistration, userLogin, userCurrentUser } = require('../../controllers/userControllers');
const { tokenValidator } = require('../../middleware/tokenValidator');

const router = express.Router();

router.post('/registration', controllerWrapper(userRegistration));
router.post('/login', controllerWrapper(userLogin));
router.get('/currentUser', tokenValidator, controllerWrapper(userCurrentUser));



module.exports = router;
