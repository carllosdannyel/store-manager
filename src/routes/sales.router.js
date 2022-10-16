const { Router } = require('express');
const salesController = require('../controllers/sales.controller');
const { salesValidate } = require('../middlewares/sales.validate');

const salesRouter = Router();

salesRouter.get('/', salesController.getAllSales);
salesRouter.get('/:id', salesController.getSalesById);
salesRouter.delete('/:id', salesController.deleteSalesById);
salesRouter.post('/', salesValidate, salesController.insertSales);

module.exports = salesRouter;