const express = require('express')
const router = express.Router()
const ordersController = require('../controllers/orders.controller');

/**
 * validar con un middleware, traer el archivo desde arafue
 */

router.get('/', ordersController.all);
router.post('/', ordersController.create);
router.put('/', ordersController.edit);
router.delete('/delete', ordersController.remove);
// get by id

module.exports = router