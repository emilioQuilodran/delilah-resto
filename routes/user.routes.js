const express = require('express')
const router = express.Router();
const userController = require("../controllers/user.controller");
const verifyToken = require('../middleware/validate-token')

router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.get('/:userId', userController.getUsersById);
router.put('/:userId', userController.updateUsersById);
router.delete('/:userId', userController.deleteUsersById);

module.exports = router