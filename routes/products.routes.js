const express = require('express')
const router = express.Router()
const productsController = require('../controllers/products.controller');

router.get('/', productsController.all);
router.post('/', productsController.create);
router.put('/', productsController.edit);
router.delete('/delete', productsController.remove);
router.get('/:id', productsController.by_id);

module.exports = router