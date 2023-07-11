const express = require('express');
const { controllerWrapper } = require('../../helpers/controllerWrapper');
const { tokenValidator } = require('../../middleware/tokenValidator');
const { addTransaction } = require('../../controllers/transactionControllers');

const router = express.Router();

router.post('/add', tokenValidator, controllerWrapper(addTransaction));

module.exports = router;
