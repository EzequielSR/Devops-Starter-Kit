class Pedido {
    constructor(cliente, items) {
        this.cliente = cliente;
        this.items = items;
        this.data = new Date();
    }
}

module.exports = Pedido;