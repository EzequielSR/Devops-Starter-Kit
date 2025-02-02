const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('Bem-vindo ao Sistema de Pedidos para Restaurante!');
})

module.exports = app;