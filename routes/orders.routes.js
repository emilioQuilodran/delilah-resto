const express = require('express')
const router = express.Router()
const ordersController = require('../controllers/orders.controller');

router.post('/', ordersController.create);
router.get('/', ordersController.all);
router.get('/user', ordersController.getUserOrders);
router.put('/', ordersController.edit);
routes.get('/:orderId', ordersController.getOrderById)
router.delete('/:orderId', ordersController.remove);

module.exports = router