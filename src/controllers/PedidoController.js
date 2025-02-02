const Pedido = require('../models/Pedido')

const listarPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.find();
        res.json(pedidos);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao listar pedidos', error: err.message });
    }
}

const criarPedido = async (req, res) => {
    const { cliente, items } = req.body;

    try {
        const novoPedido = new Pedido({ cliente, items });
        await novoPedido.save();
        res.status(201).json(novoPedido);
    } catch (err) {
        res.status(400).json({ message: 'Erro ao criar pedido', error: err.message });
    }
}

module.exports = {
    listarPedidos,
    criarPedido
}