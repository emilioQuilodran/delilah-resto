const express = require('express')
const router = express.Router()
const productsController = require('../controllers/products.controller');
const verifyToken = require('../middleware/validate-token')

router.get('/', productsController.all);
router.post('/', [verifyToken.verifyToken, verifyToken.isAdmin] , productsController.create);
router.put('/', productsController.edit);
router.delete('/delete', productsController.remove);
router.get('/:id', [verifyToken.verifyToken, verifyToken.isAdmin] , productsController.by_id);

module.exports = router