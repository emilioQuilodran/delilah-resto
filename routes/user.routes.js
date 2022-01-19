const express = require('express')
const router = express.Router();
const userController = require("../controllers/user.controller");
const verifyToken = require('../middleware/validate-token')

router.post('/', [verifyToken.verifyToken, verifyToken.isAdmin] ,userController.createUser);
router.get('/',[verifyToken.verifyToken, verifyToken.isAdmin] , userController.getUsers);
router.get('/:userId',[verifyToken.verifyToken, verifyToken.isAdmin] , userController.getUsersById);
router.put('/:userId',[verifyToken.verifyToken, verifyToken.isAdmin] , userController.updateUsersById);
router.delete('/:userId',[verifyToken.verifyToken, verifyToken.isAdmin] , userController.deleteUsersById);

module.exports = router