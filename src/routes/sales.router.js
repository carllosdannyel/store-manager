const { Router } = require('express');
const salesController = require('../controllers/sales.controller');

const salesRouter = Router();

salesRouter.get('/', salesController.getAllSales);

module.exports = salesRouter;