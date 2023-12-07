# Descrição da solução

- Foi utilizado podman versão v1.5.3 : motivo é que podman é uma solução opensource e menos vulnerável em termos de segurança que o docker com as mesmas funcionalidades e ainda sendo rootless
- Versão do node utilizada na máquina de desenv: v18.17.1

# Pré requisitos de instalação

- Podman versão v1.5.3 : https://podman-desktop.io/downloads

- Node v18.17.1 : https://nodejs.org/en/blog/release/v18.17.1

# Executar instalação
na pastas Teste2/src
- podman compose build

# Executar toda aplicação
na pastas Teste2/src
- podman compose up



# Executar aplicação via podman compose

- podman compose up 
ou
- podman compose up -d 
** se quiser utilizar sem interatividade no terminal usa a opção -d
*** Importante: roda na url http://localhost:3334/
*** Sugiro que quando acessar utilize o navegador chrome com os seguintes parametros:
chrome.exe --disable-web-security --disable-gpu --user-data-dir=%LOCALAPPDATA%\Google\chromeTemp
Isto acontece porque o backend aponta para http://localhost:3333 e os navegadores bloqueiam por segurança o acesso, seria validação do CORS (requisição de um endpoint de host/porta diferente da atual)

# Explicação dos containers
 - bd : roda o mysql
 - web : roda o frontend em angular ant
 - api : roda o backend em node

 # Pequeno detalhe:
  Pode dar problema ao efetuar o build do container web, porque o npm install busca muitos arquivos. 
  Isto provoca o erro npm ERR! EMFILE: too many open files, 
  Para isto eu rodo o npm install dentro da pasta Teste2\src\crudcliente antes de executar o build
  Não sei se irá acontecer na máquina de quem irá rodar, mas fica a dica

# Referências
https://sequelize.org/
https://sequelize.org/docs/v6/core-concepts/model-basics/
https://sequelize.org/docs/v6/getting-started/
https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
https://www.digitalocean.com/community/tutorials/how-to-build-a-node-js-application-with-docker
https://semaphoreci.com/community/tutorials/dockerizing-a-node-js-web-application
https://www.freecodecamp.org/portuguese/news/streams-em-node-js-tudo-o-que-voce-precisa-saber/
https://github.com/mafintosh/tar-stream
https://sequelize.org/docs/v6/other-topics/migrations/
https://dev.to/rogeriorioli/iniciando-um-projeto-nodejs-express-com-typescript-4bfl
https://apidog.com/blog/how-to-create-a-rest-api-with-node-js-and-express/
https://ng.ant.design/docs/introduce/en

