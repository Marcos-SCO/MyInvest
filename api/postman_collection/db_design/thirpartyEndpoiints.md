# Users
- account_types  = Tipo de conta para usuário. Ex.: email, google, facebook, github etc.

- Users = A tabela de usuários, possui informações mais básica e faz ligação com outras tabelas

- users_password = Armazena senhas, recebe o id do usuário como chave estrangeira

- user_emails = Armazena emails, recebe o id do usuário como chave estrangeira

- Assets types = Tipo de ativos . Ex.: ações, fiis etc.

# Assets
- Asset = Tabela principal do ativo, pega as informações básicas e faz ligação com outras tabelas

- asset_details_list = Essa tabela recebe o ativo como chave estrangeira. 
Aqui são inserido dados brutos das apis de terceiros, isso irá acontecer a cada periodo de tempo. 
Não desmembrei essas informações pois não iremos ter muito controle do que vai vir.

- UserAssets = Essa tabela lista todos ativos que o usuário possui. Recebe os id do usuário e ativo