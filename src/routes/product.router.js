const { Router } = require('express');
const productController = require('../controllers/product.controller');

const productRouter = Router();

productRouter.get('/', productController.getAllProducts);
productRouter.get('/:id', productController.getProductById);
productRouter.post('/', productController.createProduct);

module.exports = productRouter;
