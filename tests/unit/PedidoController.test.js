const PedidoController = require('../../src/controllers/pedidoController');
const Pedido = require('../../src/models/Pedido');

jest.mock('../../src/models/Pedido');

describe('PedidoController', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('listarPedidos', () => {
        it('deve retornar uma lista de pedidos', async () => {
            const mockPedidos = [
                {cliente: 'Cliente 1', items: ['Item 1', 'Item 2'], data: new Date()},
                {cliente: 'Cliente 2', items: ['Item 3', 'Item 4'], data: new Date()},
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
            const mockPedido = {
                _id: '65f4c8f8e4b0a1a2b3c4d5e6',
                cliente: 'Cliente 1',
                items: ['Item 1', 'Item 2'],
                data: new Date().toISOString(),
                save: jest.fn().mockResolvedValue(this),
            };

            Pedido.mockImplementation(() => mockPedido)

            const req = {
                body: {cliente: 'Cliente 1', items: ['Item 1', 'Item 2']},
            };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };

            await PedidoController.criarPedido(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockPedido);
        });

        it('deve retornar erro 400 se os itens não forem fornecidos', async () => {
            const req = {
                body: {cliente: 'Cliente 1', items: []},
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

    describe('atualizarPedido', () => {
        it('deve atualizar um pedido existente', async () => {
            const mockPedidoAtualizado = {
                _id: '65f4c8f8e4b0a1a2b3c4d5e6',
                cliente: 'Cliente Atualizado',
                items: ['Item 1', 'Item 2', 'Item 3'],
                data: new Date().toISOString(),
            };

            Pedido.findByIdAndUpdate.mockResolvedValue(mockPedidoAtualizado);

            const req = {
                params: {id: '65f4c8f8e4b0a1a2b3c4d5e6'},
                body: {cliente: 'Cliente Atualizado', items: ['Item 1', 'Item 2', 'Item 3']},
            };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };

            await PedidoController.atualizarPedido(req, res);

            expect(res.json).toHaveBeenCalledWith(mockPedidoAtualizado);
        });

        it('deve retornar erro 404 se o pedido não for encontrado', async () => {
            Pedido.findByIdAndUpdate.mockResolvedValue(null);

            const req = {
                params: {id: '65f4c8f8e4b0a1a2b3c4d5e6'},
                body: {cliente: 'Cliente Atualizado', items: ['Item 1', 'Item 2', 'Item 3']},
            };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };

            await PedidoController.atualizarPedido(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({message: 'Pedido não encontrado.'});
        });

        it('deve retornar erro 400 se os itens não forem fornecidos', async () => {
            const req = {
                params: {id: '65f4c8f8e4b0a1a2b3c4d5e6'},
                body: {cliente: 'Cliente Atualizado', items: []},
            };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };

            await PedidoController.atualizarPedido(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: 'É necessário fornecer pelo menos um item.',
            });
        });
    });

    describe('deletarPedido', () => {
        it('deve deletar um pedido existente', async () => {
            const mockPedidoDeletado = {
                _id: '65f4c8f8e4b0a1a2b3c4d5e6',
                cliente: 'Cliente 1',
                items: ['Item 1', 'Item 2'],
                data: new Date().toISOString(),
            };

            Pedido.findByIdAndDelete.mockResolvedValue(mockPedidoDeletado);

            const req = {
                params: {id: '65f4c8f8e4b0a1a2b3c4d5e6'},
            };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };

            await PedidoController.deletarPedido(req, res);

            expect(res.json).toHaveBeenCalledWith({message: 'Pedido deletado com sucesso.'});
        });

        it('deve retornar erro 404 se o pedido não for encontrado', async () => {
            Pedido.findByIdAndDelete.mockResolvedValue(null);

            const req = {
                params: {id: '65f4c8f8e4b0a1a2b3c4d5e6'},
            };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };

            await PedidoController.deletarPedido(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({message: 'Pedido não encontrado.'});
        });
    });
});