const express = require('express')
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post('/login', authController.signIn);
router.post('/register', authController.signUp);

module.exports = router