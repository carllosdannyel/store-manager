const { Router } = require('express');
const salesController = require('../controllers/sales.controller');

const salesRouter = Router();

salesRouter.get('/', salesController.getAllSales);
salesRouter.get('/:id', salesController.getSalesById);

module.exports = salesRouter;