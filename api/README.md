# Como iniciar o Back-end

### node na versão : 18.17.0 ou superior

- Se preferir Instale o nvm para executar, o projeto, na versão exata em desenvolvimento. Com nvm é possível ter várias versões de node, sem precisar de uma instalação global.


### Acesse a pasta api
- cd api

### Execute o comando para instalar as dependências
- npm i

### Vá até o Mysql e crie o banco de dados
- CREATE DATABASE db_myInvest CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

### Insira suas variáveis de ambiente
- Copie o arquivo .env-example e renomeei para .env
 - Adicione as credencias do seu ambiente local

### Rode o projeto executando dentro da pasta api
- npx prisma generate
- npm run dev

### Execute o schema para a criação das tabelas no db
  Vá até a pasta /prisma e execute: 
  - npx prisma migrate dev


### Execute seeders para teste
- Vá até /prisma/seeders 
  - Execute o comando: npm run prisma-seed
  - Isso fará com que o banco de dados seja copulado com usuários, cada vez que o comando é executado 10 itens aleatórios são inseridos;

- Para limpar os registros, execute : npm run prisma-drop-seed

### Utilize o postman
- Vá até o postman e importe o arquivo presente em: api/postman_collection



# Backend notes

## Dependencies
- express
- mysql2

- faker

- prisma
- @types/prisma

- tsc-alias

- node-cron

- bcrypt
- @types/bcrypt

- ioredis
- @types/ioredis

- cors
- express-async-errors
- @types/node
- nodemon
- pm2

- ts-node
- tsconfig-paths
- typescript

- jsonwebtoken
- @types/jsonwebtoken

- @types/cors
- @types/express

- axios
- @types/axios 

- nodemailer: npm i nodemailer @types/nodemailer

- cheerio @types/cheerio

- pre-commit: npm i -D pre-commit

# Prisma commands

- npx prisma init

- npx prisma migrate save --name <migration=name>

- npx prisma migrate dev

- npx prisma migrate up 

- send to remote server: npx prisma db push