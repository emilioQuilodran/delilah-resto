const express = require('express')
const router = express.Router()
const productsController = require('../controllers/products.controller');
const verifyToken = require('../middleware/validate-token')

router.get('/', productsController.all);
router.get('/:id',  productsController.by_id);
router.post('/', [verifyToken.verifyToken, verifyToken.isAdmin] , productsController.create);
router.put('/:id',[verifyToken.verifyToken, verifyToken.isAdmin] , productsController.edit);
router.delete('/delete/:id',[verifyToken.verifyToken, verifyToken.isAdmin] , productsController.remove);

module.exports = router