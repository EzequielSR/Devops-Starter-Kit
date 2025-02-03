# Sistema_Pedidos-DevOps 📝

Um sistema de pedidos online para restaurantes, desenvolvido com Node.js, MongoDB, Docker, Vagrant e Kubernetes. Este projeto foi criado para aplicar os conhecimentos do curso **DevOps: Cultura à Prática** da **DBserver**, incluindo provisionamento de ambientes, containerização e orquestração de containers.

---

# Sumário 📑
- [Requisitos](#requisitos-)
- [Funcionalidades](#funcionalidades-)
- [Tecnologias Utilizadas](#tecnologias-utilizadas-)
- [Como Executar](#como-executar-)
  - [Localmente](#localmente-)
  - [Com Docker](#com-docker-)
  - [Com Vagrant](#com-vagrant-)
  - [Com Kubernetes](#com-kubernetes-)
- [Testes](#testes-)
- [Estrutura do Projeto](#estrutura-do-projeto-)
  

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

### Localmente 🚩

1. **Clone o repositório**
   ```bash
   git clone https://github.com/EzequielSR/POO_Naruto_DB.git
   cd POO_Naruto_DB

2. **Instale as dependências** <br>
   ```bash
   npm install
   ```

3. **Inicie o MongoDB localmente**(ou use um serviço como MongoDB Atlas). <br>

4. Configure a variável de ambiente *MONGO_URI* no arquivo *.env* <br>
   ```bash
   MONGO_URI=mongodb://localhost:27017/sistema-pedidos
   ```
   
5. **Execute a aplicação** <br>
   ```bash
   npm start
   ```
   
6. Acesse a aplicação **http://localhost:3000** <br>
---

## Com Docker 🐳

1. Contrua e execute os containers:
   ```bash
   docker-compose up --build
   ```

2. Acesse a aplicação em: **http://localhost:3000**

---

## Com Vagrant 🖥

1. Inicie a máquina virtual no terminal:
   ```bash
   vagrant up
   vagrant ssh
   ```

2. Dentro da VM, navegue até o diretório do projeto e execute o Docker Compose:
   ```bash
   cd /vagrant
   docker-compose up --build
   ```

3. Acesse a aplicação em: **http://localhost:3000**

---

## Com Kubernetes 🔱

1. Inicie o Minikube:
   ```bash
   minikube start
   ```

2. Construa a imagem do Docker dentro do Minikube:
   ```bash
   eval $(minikube docker-env)
   docker build 0t sistema-pedidos:latest .
   ```

3. Aplique os arquivos de configuração do Kubernetes:
   ```bash
   kubectl apply -f kubernetes/deployment.yml
   kubectl apply -f kubernetes/service.yml
   ```

4. Obtenha o IP do Minikube e acesse a aplicação:
   ```bash
   minikube ip
   ```

Acesse **http://<minikube-ip>:<porta>**.



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
   
### Estrutura dos Testes:

* Testes Unitários:
 * Verificam as funções do controlador (*PedidoController*).
 * Localizado em: *tests/unit/*.

* Testes de Integração:
  * Verificam as rotas da API.
  * Localizados em: *tests/integration/*.
 
    ```plaintext
    tests/
    ├── integration/                 
    │   └── pedidos.test.js
    |
    └── unity/                 
        └── PedidoController.test.js
    ```

---

## Estrutura do Projeto 🏗

A estrutura do projeto está organizada da seguinte forma:

```plaintext
Sistema_Pedidos-DevOps/
├── src/                 
│   ├── config/
|   |    └── db.js
|   |          
│   ├── controllers/
|   |    └── pedidoController.js
|   |
│   ├── models/
|   |    └── Pedido.js
|   |
│   ├── routes/
|   |    └── pedidosRoutes.js 
|   |
│   ├── utils/
|   |    └── validators.js
|   |    
│   ├── app.js            
│   └── server.js         
|
├── tests/               
│   ├── unit/
|   |    └── PedidoController.test.js
|   |            
│   └── integration/
|        └── pedidos.test.js      
|
|
├── kubernetes/          
│   ├── deployment.yml   
│   └── service.yml      
|       
|
├── .env                 
├── .gitignore            
├── package.json          
├── Dockerfile           
├── docker-compose.yml    
├── Vagrantfile    
└── README.md             
```
