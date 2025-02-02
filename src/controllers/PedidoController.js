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

    if (!items || items.length === 0) {
        return res.status(400).json({ message: 'É necessário fornecer pelo menos um item.' });
    }

    try {
        const novoPedido = new Pedido({ cliente, items });
        await novoPedido.save();
        res.status(201).json(novoPedido);
    } catch (err) {
        res.status(400).json({ message: 'Erro ao criar pedido', error: err.message });
    }
}

const atualizarPedido = async (req, res) => {
    const {id} = req.params;
    const {cliente, items} = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({message: 'É necessário fornecer pelo menos um item.'})
    }

    try {
        const pedidoAtualizado = await Pedido.findByIdAndUpdate(
            id,
            {cliente, items},
            { new: true }
        )

        if(!pedidoAtualizado) {
            return res.status(404).json({message: 'Pedido não encontrado.'})
        }

        res.json(pedidoAtualizado);
    }catch(err) {
        res.status(400).json({ message: 'Erro ao atualizar pedido', error: err.message });
    }
}

const deletarPedido = async (req, res) => {
    const { id } = req.params;

    try {
        const pedidoDeletado = await Pedido.findByIdAndDelete(id);

        if (!pedidoDeletado) {
            return res.status(404).json({ message: 'Pedido não encontrado.' });
        }

        res.json({ message: 'Pedido deletado com sucesso.' });
    } catch (err) {
        res.status(400).json({ message: 'Erro ao deletar pedido', error: err.message });
    }
}

module.exports = {
    listarPedidos,
    criarPedido,
    atualizarPedido,
    deletarPedido
}