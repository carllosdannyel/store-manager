const { Router } = require('express');
const productController = require('../controllers/product.controller');

const productRouter = Router();

productRouter.get('/', productController.getAllProducts);
productRouter.get('/:id', productController.getProductById);
productRouter.post('/', productController.createProduct);
productRouter.put('/:id', productController.updateProduct);
productRouter.delete('/:id', productController.deleteProductById);

module.exports = productRouter;
