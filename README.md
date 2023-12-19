# MyInvest

<p>
  Projeto demonstrativo sobre o mercado financeiro, desenvolvido como trabalho para conclusão de curso na instituição ETEC Barueri. 
</p>

<p>
  As principais tecnologias utilizadas para codificação foram:<br/> 
  JS com Node, banco de dados MySQL e no front-end, framework de react NEXT.js.
</p>

<p>
  Tem o intuito de monitorar o preço dos ativos e definir alertas para cada item.
  Sendo ações, stocks (ações-norte-americanas) e Fiis (Fundos imobiliários).
</p>

<p align="left">
  <a href='https://github.com/Marcos-SCO/MyInvest/'>
    <img src="./frontend/public/img/mockups/myInvestMockup.jpg?raw=true" width="600" title="Main screen mockup">
  </a>
</p>

<br/>
<p>
  No topo do site, clickando na barra de busca é apresentado resultados sobre os elementos, tendo nas descrições o nome da empresa, valor atual e variação percentual sendo positiva ou negativa.
</p>
<br/>
<br/>

<p align="left">
  <a href='https://github.com/Marcos-SCO/MyInvest/'>
    <img src="./frontend/public/img/gif/searchBar.gif?raw=true" width="600" title="Top search bar">
  </a>
</p>

<br/>
<p>
  Entrando na página do ativo é possível visualizar gráficos com as cotações de valor dos últimos 3 meses.
<p>
<br/>

<p align="left">
  <a href='https://github.com/Marcos-SCO/MyInvest/'>
    <img src="./frontend/public/img/gif/graph.gif?raw=true" width="600" title="Asset Graph">
  </a>
</p>

<br/>
<p>
  Outra funcionalidade é a definição de alertas para valor das cotações, no qual, quando definido e atingido, <br/>o usuário receberá um e-mail informando sobre.
</p>
<br/>

<p align="left">
  <a href='https://github.com/Marcos-SCO/MyInvest/'>
    <img src="./frontend/public/img/gif/alerts.gif?raw=true" width="600" title="Alerts definition">
  </a>
</p>

<p>
  <br/>
  Todos os ativos estarão em um card contendo suas informações e no canto superior direito há o botão para “seguir”.

  Os elementos marcados pelo usuário estarão disponíveis na página “meus ativos”. 
  Para deixar de seguir basta clickar no botão “seguindo” que irá abrir um modal confirmando a ação.
  <br/>
</p>

<p align="left">
  <a href='https://github.com/Marcos-SCO/MyInvest/'>
    <img src="./frontend/public/img/gif/assetList.gif?raw=true" width="600" title="Asset list">
  </a>
</p>

<p>
  <br/>
  Nos alertas o card é similar, mas um pouco diferente, contendo informações e valor 
  definido pelo usuário em destaque, podendo ser das opções “menor que” ou “maior que”.
  <br/>
</p>

<p>
  <br/>
  Para facilidade de acesso, foram construídas duas opções de login, usando a conta google
  ou então da maneira tradicional com e-mail e senha.
  <br/>
</p>

<p align="left">
  <a href='https://github.com/Marcos-SCO/MyInvest/'>
    <img src="./frontend/public/img/gif/login.gif?raw=true" width="600" title="Login">
  </a>
</p>

<p>
  <br/>
  A página inicial possui sliders com o top de ações e fiis que mais subiram ou caíram<br/> 
  durante o expediente da bolsa de valores.
  <br/>
</p>

<p align="left">
  <a href='https://github.com/Marcos-SCO/MyInvest/'>
    <img src="./frontend/public/img/gif/initialPage.gif?raw=true" width="600" title="Initial page">
  </a>
</p>

<br/>

## Cronjob
No projeto foram utilizadas ferramentas gratuitas e api de terceiros contendo limitações.  Sendo um projeto experimental e para que não houvesse uma sobrecarga de recursos, houve a necessidade em atualizar e cachear itens de forma inteligente.

Ao pesquisar por um elemento, ele é salvo no banco de dados caso ainda não tenha sido registrado no sistema. 

Após isso, esse elemento é disponibilizado para todos os outros usuários.

De tempos em tempos, durante o período de abertura até o fechamento da bolsa valores, um cron cron job é executado. 

Essa operação de rotina atualiza todos os itens do banco e também dispara os alertas de e-mails que atingiram o valor esperado.

<p align="left">
  <a href='https://github.com/Marcos-SCO/MyInvest/'>
    <img src="./frontend/public/img/gif/cronjob.gif?raw=true" width="600" title="cronjob">
  </a>
</p>