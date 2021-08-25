const express = require('express')
const router = express.Router()
const registerController = require('../controllers/register.controller');

router.get('/', registerController.sign_in);

module.exports = router