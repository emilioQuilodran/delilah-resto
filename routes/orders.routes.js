const express = require('express')
const router = express.Router()
const ordersController = require('../controllers/orders.controller');

/**
 * validar con un middleware, traer el archivo desde arafue
 */

router.post('/', ordersController.create);
router.get('/', ordersController.listar);

module.exports = router