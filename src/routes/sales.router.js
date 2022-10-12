const { Router } = require('express');
const salesController = require('../controllers/sales.controller');

const salesRouter = Router();

salesRouter.post('/', salesController.createSales);

module.exports = salesRouter;