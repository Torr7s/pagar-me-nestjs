
# PagarMe technical challenge

In this challenge, an oversimplified version of a Payment Service Provider (PSP) must be built, which relies on Consumer, Transactions and Payables modules.

**Note**: I am NOT applying for the position offered, however, it is a great challenge and I couldn't pass it up.

You can access the application requirements **[here](https://github.com/pagarme/vagas/blob/master/desafios/software-engineer-backend/README.md)** (pt-BR).
## Stacks used
- Node.Js
- Typescript
- Docker, docker-compose
- NestJs
- PrismaIO (PostgreSQL)


## Running the project

To run the project, follow the next steps:

- Clone the repository and browse to it:
```bash
  git clone https://github.com/Torr7s/pagar-me-nestjs

  cd pagar-me-nestjs
```

- Install the dependencies
```bash
npm install 

yarn
```

- Setup environment variables
```bash
PG_USER

PG_DB

PG_PASS

DATABASE_URL

MD5_HASH_KEY
```

- Build Dockerfile image
```bash
docker build -t <image-name> .
```

- Run Docker containers
```bash
docker-compose up
```

- Once the application is up, run prisma migrations
```bash
npm run prisma:dev init

yarn prisma:dev init
```
## Api Documentation

After initial application setup, you will be able to access the Swagger documentation, just go to **[http://localhost:8080/api](http://localhost:8008/api)**.

**Note**: All endpoints, except for authentication and consumer creation, require the consumer to be authenticated.

### • **Consumers endpoints**
#### **Creation**

```http
  POST /api/consumers
```

| **Body**   | **Type** | **Description**   | **Required** |
| :--------- | :------- | :---------------- | :----------- |
| `name`     | `string` | Consumer name     | ✅           |
| `email`    | `string` | Consumer email    | ✅           |
| `password` | `string` | Consumer password | ✅           |

#### **Authentication**

```http
  POST /login
```

| **Body**   | **Type** | **Description**   | **Required** |
| :--------- | :------- | :---------------- | :----------- |
| `email`    | `string` | Consumer email    | ✅           |
| `password` | `string` | Consumer password | ✅           |

### • **Payables endpoints**
#### **Listing**

```http
  GET /api/payables/{status}
```

Available status: paid or waiting_funds.

| Param    | Type     | Description    |
| :--------| :------- | :------------- |
| `status` | `string` | Payable status |

### • **Transactions endpoints**
#### **Creation**

⚠️ The consumer's id will be obtained automatically if the consumer is authenticated.

```http
  POST /api/transactions
```

| **Body**               | **Type** | **Description**                  | **Required** | 
| :----------            | :------- | :------------------------------- | :----------- |
| `value`                | `string` | Transaction value                | ✅           |
| `description`          | `string` | Transaction description          | ✅           |  
| `payment_method`       | `string` | Transaction payment method       | ✅           |
| `card_number`          | `string` | Transaction card number          | ✅           |
| `card_owner`           | `string` | Transaction card owner name      | ✅           |
| `card_expiration_date` | `string` | Transaction card expiration date | ✅           |
| `card_cvv`             | `string` | Transaction card cvv             | ✅           |
| `consumerId`           | `string` | Transaction consumer id          | ✅           |

#### **Finding**

```http
  GET /api/transactions/{id}
```

| **Param** | **Type** | **Description** |
| :-------- | :------- | :-------------- | 
| `id`      | `string` | Transaction id  |

#### **Listing**

| **Param** | **Type** | **Description** |
| :-------- | :------- | :-------------- | 
| `id`      | `string` | Transaction id  |

#### **Listing**

⚠️ The consumer's id will be obtained automatically if the consumer is authenticated.

```http
  GET /api/transactions
```
