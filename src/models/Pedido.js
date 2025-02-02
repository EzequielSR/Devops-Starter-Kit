const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema( {
    cliente: {
        type: String,
        required: true,
    },
    items: {
        type: [String],
        required: true,
    },
    data: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Pedido', PedidoSchema);