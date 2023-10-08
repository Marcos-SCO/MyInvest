# MyInvest
Projeto realizado para TCC com intuito de ser realizado um WebApp com função de alerta de investimentos personalizados e vizualisação de ações.


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
- npx prisma migrate dev


### Execute seeders para teste
- Vá até /prisma/seeders 
  - Execute o comando: node _executeSeeder.ts
  - Isso fará com que o banco de dados seja copulado com usuários, cada vez que o comando é executado 10 itens aleatórios são inseridos;

- Caso deseje limpar os registros no db, execute o arquivo: node _executeDrops.ts

### Utilize o postman
- Vá até o postman e importe o arquivo presente em: api/postman_collection