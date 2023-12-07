# Descrição da solução

- Foi utilizado podman versão v1.5.3 : motivo é que podman é uma solução opensource e menos vulnerável em termos de segurança que o docker com as mesmas funcionalidades e ainda sendo rootless
- Versão do node utilizada na máquina de desenv: v18.17.1

# Pré requisitos de instalação

- Podman versão v1.5.3 : https://podman-desktop.io/downloads

- Node v18.17.1 : https://nodejs.org/en/blog/release/v18.17.1

# Executar instalação

- npm run node-tsk-install

*** IMPORTANTE : cada nova instalação "npm run node-tsk-install" recria o ambiente totalmente novo, apagando o código anterior

# Executar aplicação

- npm run node-tsk

*** Importante: roda na url http://localhost:3000/


# Executar aplicação via podman compose

- podman compose up 
ou
- podman compose up -d 
** se quiser utilizar sem interatividade no terminal usa a opção -d
*** Importante: roda na url http://localhost:3000/

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

