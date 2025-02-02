const express = require('express');
const bodyParser = require('body-parser');
const pedidoRoutes = require('./routes/pedidosRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/pedidos', pedidoRoutes)

app.get('/', (req, res) => {
    res.render('Bem-vindo ao Sistema de Pedidos para Restaurante!');
})

module.exports = app;