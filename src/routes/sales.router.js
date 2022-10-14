const { Router } = require('express');
const salesController = require('../controllers/sales.controller');

const salesRouter = Router();

salesRouter.get('/', salesController.getAllSales);
salesRouter.get('/:id', salesController.getSalesById);
salesRouter.delete('/:id', salesController.deleteSalesById);

module.exports = salesRouter;