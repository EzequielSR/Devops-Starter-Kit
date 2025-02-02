const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Lista de pedidos '})
})

router.post('/', (req, res) => {
    const { cliente, items } = req.body;
    res.json({ message: 'Pedido criado', cliente, items});
})

module.exports = router;