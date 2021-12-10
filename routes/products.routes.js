const express = require('express')
const router = express.Router()
const productsController = require('../controllers/products.controller');
const verifyToken = require('../middleware/validate-token')

router.get('/', productsController.all);
router.post('/', [verifyToken.verifyToken, verifyToken.isAdmin] , productsController.create);
router.put('/:id', productsController.edit);
router.delete('/delete/:id', productsController.remove);
router.get('/:id',  productsController.by_id);

module.exports = router