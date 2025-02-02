const validarPedido = (pedido) => {
    return !(!pedido.cliente || !pedido.items || pedido.items.length === 0);

};

module.exports = {
    validarPedido
}