const express = require('express')
const router = express.Router()
const ordersController = require('../controllers/orders.controller');
const verifyToken = require('../middleware/validate-token')

router.post('/', [verifyToken.verifyToken, verifyToken.isAdmin] , ordersController.create);
router.get('/', [verifyToken.verifyToken, verifyToken.isAdmin] , ordersController.all);
router.get('/user', [verifyToken.verifyToken, verifyToken.isAdmin] , ordersController.getUserOrders);
router.put('/:orderId', [verifyToken.verifyToken, verifyToken.isAdmin] , ordersController.edit);
router.delete('/:orderId', [verifyToken.verifyToken, verifyToken.isAdmin] , ordersController.remove);

module.exports = router