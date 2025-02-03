const request = require('supertest');
const app = require('../../src/app');
const Pedido = require('../../src/models/Pedido');

jest.mock('../../src/models/Pedido');

describe('Testes de Integração - Pedidos', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /pedidos', () => {
        it('deve retornar uma lista de pedidos', async () => {
            const mockPedidos = [
                {cliente: 'Cliente 1', items: ['Item 1', 'Item 2'], data: new Date().toISOString()},
                {cliente: 'Cliente 2', items: ['Item 3', 'Item 4'], data: new Date().toISOString()},
            ];
            Pedido.find.mockResolvedValue(mockPedidos);

            const response = await request(app).get('/pedidos');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockPedidos);
        });

        it('deve retornar erro 500 em caso de falha', async () => {
            Pedido.find.mockRejectedValue(new Error('Erro ao listar pedidos'));

            const response = await request(app).get('/pedidos');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({
                message: 'Erro ao listar pedidos',
                error: 'Erro ao listar pedidos',
            });
        });
    });

    describe('POST /pedidos', () => {
        it('deve criar um novo pedido', async () => {
            const mockPedido = {
                _id: '65f4c8f8e4b0a1a2b3c4d5e6',
                cliente: 'Cliente 1',
                items: ['Item 1', 'Item 2'],
                data: new Date().toISOString(),
                save: jest.fn().mockResolvedValue(this)
            };
            Pedido.mockImplementation(() => mockPedido)

            const response = await request(app)
                .post('/pedidos')
                .send({cliente: 'Cliente 1', items: ['Item 1', 'Item 2']});

            expect(response.status).toBe(201);
            expect(response.body).toMatchObject({
                cliente: 'Cliente 1',
                items: ['Item 1', 'Item 2'],
            });
            expect(new Date(response.body.data)).toBeInstanceOf(Date);
        });

        it('deve retornar erro 400 se os itens não forem fornecidos', async () => {
            const response = await request(app)
                .post('/pedidos')
                .send({cliente: 'Cliente 1', items: []});

            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                message: 'É necessário fornecer pelo menos um item.',
            });
        });
    });
    describe('PUT /pedidos/:id', () => {
        it('deve atualizar um pedido existente', async () => {
            const mockPedidoAtualizado = {
                _id: '65f4c8f8e4b0a1a2b3c4d5e6',
                cliente: 'Cliente Atualizado',
                items: ['Item 1', 'Item 2', 'Item 3'],
                data: new Date().toISOString(),
            };

            Pedido.findByIdAndUpdate.mockResolvedValue(mockPedidoAtualizado);

            const response = await request(app)
                .put('/pedidos/65f4c8f8e4b0a1a2b3c4d5e6')
                .send({cliente: 'Cliente Atualizado', items: ['Item 1', 'Item 2', 'Item 3']});

            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({
                cliente: 'Cliente Atualizado',
                items: ['Item 1', 'Item 2', 'Item 3'],
            });
        });

        it('deve retornar erro 404 se o pedido não for encontrado', async () => {
            Pedido.findByIdAndUpdate.mockResolvedValue(null);

            const response = await request(app)
                .put('/pedidos/65f4c8f8e4b0a1a2b3c4d5e6')
                .send({cliente: 'Cliente Atualizado', items: ['Item 1', 'Item 2', 'Item 3']});

            expect(response.status).toBe(404);
            expect(response.body).toEqual({message: 'Pedido não encontrado.'});
        });

        it('deve retornar erro 400 se os itens não forem fornecidos', async () => {
            const response = await request(app)
                .put('/pedidos/65f4c8f8e4b0a1a2b3c4d5e6')
                .send({cliente: 'Cliente Atualizado', items: []});

            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                message: 'É necessário fornecer pelo menos um item.',
            });
        });
    });

    describe('DELETE /pedidos/:id', () => {
        it('deve deletar um pedido existente', async () => {
            const mockPedidoDeletado = {
                _id: '65f4c8f8e4b0a1a2b3c4d5e6',
                cliente: 'Cliente 1',
                items: ['Item 1', 'Item 2'],
                data: new Date().toISOString(),
            };

            Pedido.findByIdAndDelete.mockResolvedValue(mockPedidoDeletado);

            const response = await request(app)
                .delete('/pedidos/65f4c8f8e4b0a1a2b3c4d5e6');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({message: 'Pedido deletado com sucesso.'});
        });

        it('deve retornar erro 404 se o pedido não for encontrado', async () => {
            Pedido.findByIdAndDelete.mockResolvedValue(null);

            const response = await request(app)
                .delete('/pedidos/65f4c8f8e4b0a1a2b3c4d5e6');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({message: 'Pedido não encontrado.'});
        });
    });
});