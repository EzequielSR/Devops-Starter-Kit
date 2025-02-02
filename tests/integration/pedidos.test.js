const request = require('supertest');
const app = require('../../src/app');
const Pedido = require('../../src/models/Pedido');

// Mock do modelo Pedido
jest.mock('../../src/models/Pedido');

describe('Testes de Integração - Pedidos', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Limpa os mocks após cada teste
    });

    describe('GET /pedidos', () => {
        it('deve retornar uma lista de pedidos', async () => {
            const mockPedidos = [
                { cliente: 'Cliente 1', items: ['Item 1', 'Item 2'], data: new Date() },
                { cliente: 'Cliente 2', items: ['Item 3', 'Item 4'], data: new Date() },
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
            const mockPedido = { cliente: 'Cliente 1', items: ['Item 1', 'Item 2'], data: new Date() };
            Pedido.mockImplementation(()=>({
                save: jest.fn().mockResolvedValue(mockPedido),
            }))

            const response = await request(app)
                .post('/pedidos')
                .send({ cliente: 'Cliente 1', items: ['Item 1', 'Item 2'] });

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
                .send({ cliente: 'Cliente 1', items: [] });

            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                message: 'É necessário fornecer pelo menos um item.',
            });
        });
    });
});