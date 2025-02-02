const express = require('express');
const router = express.Router();
const PedidoController = require('../controllers/pedidoController');

router.get('/', PedidoController.listarPedidos)

router.post('/', PedidoController.criarPedido)

router.put('/:id', PedidoController.atualizarPedido);

router.delete('/:id', PedidoController.deletarPedido);

module.exports = router;