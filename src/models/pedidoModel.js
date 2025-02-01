import mongoose from 'mongoose';

const pedidoSchema = new mongoose.Schema({
    cliente: {
        type: String,
        required: true
    },
    prato: {
        type: String,
        required: true
    },
    quantidade: {
        type: Number,
        required: true,
        min: 1
    },
    status: {
        type: String,
        default: 'pendente'
    }
});

export default mongoose.model('Pedido', pedidoSchema);