const PedidoController = require('../../src/controllers/pedidoController');
const Pedido = require('../../src/models/Pedido');

// Mock do modelo Pedido
jest.mock('../../src/models/Pedido');

describe('PedidoController', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Limpa os mocks após cada teste
    });

    describe('listarPedidos', () => {
        it('deve retornar uma lista de pedidos', async () => {
            const mockPedidos = [
                { cliente: 'Cliente 1', items: ['Item 1', 'Item 2'], data: new Date() },
                { cliente: 'Cliente 2', items: ['Item 3', 'Item 4'], data: new Date() },
            ];
            Pedido.find.mockResolvedValue(mockPedidos);

            const req = {};
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };

            await PedidoController.listarPedidos(req, res);

            expect(res.json).toHaveBeenCalledWith(mockPedidos);
        });

        it('deve retornar erro 500 em caso de falha', async () => {
            Pedido.find.mockRejectedValue(new Error('Erro ao listar pedidos'));

            const req = {};
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };

            await PedidoController.listarPedidos(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Erro ao listar pedidos',
                error: 'Erro ao listar pedidos',
            });
        });
    });

    describe('criarPedido', () => {
        it('deve criar um novo pedido', async () => {
            const mockPedido = { cliente: 'Cliente 1', items: ['Item 1', 'Item 2'], data: new Date() };
            Pedido.mockImplementation(()=>({
                save: jest.fn().mockResolvedValue(mockPedido),
            }))

            const req = {
                body: { cliente: 'Cliente 1', items: ['Item 1', 'Item 2'] },
            };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };

            await PedidoController.criarPedido(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockPedido.toObject());
        });

        it('deve retornar erro 400 se os itens não forem fornecidos', async () => {
            const req = {
                body: { cliente: 'Cliente 1', items: [] },
            };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };

            await PedidoController.criarPedido(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: 'É necessário fornecer pelo menos um item.',
            });
        });
    });
});