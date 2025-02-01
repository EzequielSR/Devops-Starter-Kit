import Pedido from '../models/pedidoModel';

exports.criarPedido = async (req, res) => {
    try{
        const pedido = new Pedido(req.body);
        await pedido.save();
        res.status(201).send(pedido);
    } catch(err){
        res.status(400).send(err);
    }
}

exports.pegarTodosPedidos = async(req,res) => {
    try {
        const pedidos = await Pedido.find();
        res.send(pedidos);
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.getPedidoPorId = async (req,res) => {
    try {
        const pedido = await Pedido.findById(req.params.id);
        if(!pedido) return res.status(404).send('Pedido não encontrado');
        res.send(pedido);
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.updatePedido = async (req, res) => {
    try {
        const pedido = await Pedido.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!pedido) return res.status(404).send('Pedido não encontrado');
        res.send(pedido);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deletePedido = async (req, res) => {
    try {
        const pedido = await Pedido.findByIdAndDelete(req.params.id);
        if (!pedido) return res.status(404).send('Pedido não encontrado');
        res.send('Pedido deletado');
    } catch (error) {
        res.status(500).send(error);
    }
};