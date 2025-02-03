# Sistema_Pedidos-DevOps 📝

Um sistema de pedidos online para restaurantes, desenvolvido com Node.js, MongoDB, Docker, Vagrant e Kubernetes. Este projeto foi criado para aplicar os conhecimentos do curso **DevOps: Cultura à Prática** da **DBserver**, incluindo provisionamento de ambientes, containerização e orquestração de containers.

---

# Sumário 📑
- [Requisitos](#requisitos-)
- [Funcionalidades](#funcionalidades-)
- [Tecnologias Utilizadas](#tecnologias-utilizadas-)
- [Como Executar](#como-executar)
  - [Localmente](#localmente)
  - [Com Docker](#com-docker)
  - [Com Vagrant](#com-vagrant)
  - [Com Kubernetes](#com-kubernetes)
- [Testes](#testes-)
- [Estrutura do Projeto](#estrutura-do-projeto)
  

---

## Requisitos 📋

- **Node.js** (v18 ou superior) 💿
- **MongoDB** (v6.0 ou superior) 🚀
- **Docker** (v20.10 ou superior) 🗄️
- **Docker Compose** (v1.29 ou superior) 🔗
- **Kubernetes** (opcional, para orquestração) 🔄
- **Minikube** (opcional, para Kubernetes local) 💾


---

## Funcionalidades 🛠

### Funcionalidades Implementadas
- **Criar Pedido**: Adiciona um novo pedido ao sistema.
- **Listar Pedidos**: Retorna todos os pedidos cadastrados.
- **Atualizar Pedido**:  Atualiza os dados de um pedido existente.
- **Deletar Pedido**:  Remove um pedido do sistema.
- **Validação de Itens**:  Garante que cada pedido tenha pelo menos um item.

---

## Tecnologias Utilizadas 💻

- **Backend**:
  -  Node.js
  -  Express
  -  MongoDB
    
- **DevOps**:
  - Docker
  - Docker Compose
  - Vagrant
  - Kubernetes

- **Testes**:
  - Jest
  - Supertest

---

## Como Executar ⁉

1. **Clone o repositório**
   ```bash
   git clone https://github.com/EzequielSR/POO_Naruto_DB.git
   cd POO_Naruto_DB

2. **Instale as dependências** <br>
   ```bash
   npm install
   ```

3. **Inicie o MongoDB localmente**(ou use um serviço como MongoDB Atlas). <br>

4. **Configure a variável de ambiente *MONGO_URI* no arquivo *.env* ** <br>
   ```bash
   MONGO_URI=mongodb://localhost:27017/sistema-pedidos
   ```
   
5. **Execute a aplicação** <br>
   ```bash
   npm start
   ```
   
6. **Acesse a aplicação *http://localhost:3000* ** <br>

---

## Testes 🧪

O projeto inclui testes unitários e de integração. Para executar os testes:

1. Instale as dependências de desenvolvimento:
   ```bash
     npm install
   ```
2. Execute os testes:
   ```bash
     npm test
   ```

---

## Estrutura do Projeto 🏗

A estrutura do projeto está organizada da seguinte forma:

```plaintext
Sistema_Pedidos-DevOps/
├── src/                  # Código-fonte da aplicação
│   ├── config/           # Configurações (ex: conexão com o MongoDB)
│   ├── controllers/      # Lógica de controle (ex: PedidoController)
│   ├── models/           # Modelos de dados (ex: Pedido)
│   ├── routes/           # Rotas da API (ex: pedidos.js)
│   ├── utils/            # Utilitários (ex: validações)
│   ├── app.js            # Configuração do Express
│   └── server.js         # Inicialização do servidor
|
├── tests/                # Testes automatizados
│   ├── unit/             # Testes unitários
│   └── integration/      # Testes de integração
|
|
├── kubernetes/           # Configurações do Kubernetes
│   ├── deployment.yml    # Arquivo de deployment
│   └── service.yml       # Arquivo de serviço
|
├── vagrant/              # Configurações do Vagrant
│   └── Vagrantfile       # Arquivo de configuração do Vagrant
|
├── .env                  # Variáveis de ambiente
├── .gitignore            # Arquivos ignorados pelo Git
├── package.json          # Dependências e scripts do Node.js
├── Dockerfile            # Arquivo para construir a imagem do Node.js
├── docker-compose.yml    # Arquivo para orquestrar os containers
└── README.md             # Documentação do projeto
```
