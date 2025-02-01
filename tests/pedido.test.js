import request  from 'supertest';
import app from '../src/server'; // Ajuste o caminho conforme necessário
import Pedido from '../src/models/pedidoModel';

describe('Testes de Pedido', () => {
    beforeAll(async () => {
        await Pedido.deleteMany({});
    });

    it('Deve criar um novo pedido', async () => {
        const res = await request(app)
            .post('/api/pedidos')
            .send({
                cliente: 'João',
                prato: 'Pizza',
                quantidade: 2
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
    });

    it('Deve listar todos os pedidos', async () => {
        const res = await request(app).get('/api/pedidos');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});