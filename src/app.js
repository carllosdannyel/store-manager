const express = require('express');
const productRouter = require('./routes/product.router');
const salesRouter = require('./routes/sales.router');

const app = express();
app.use(express.json());

app.use('/products', productRouter);
app.use('/sales', salesRouter);

app.get('/', (_request, response) => response.send());

module.exports = app;
