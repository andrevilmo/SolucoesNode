# Descrição da solução
Foi criado um app web para efetuar o download mais rapidamente para fins de prosseguimento mais rápido.
Assim temos o ambiente de desenvolvimento development e producão production.
development busca o arquivo local para ser mais rápdio.
production busca o arquivo no link web definido

# Executar aplicação para download local
No diretório node/code
- npm start
*** Importante: roda na url http://localhost:3000/

No diretório node/task
- npm start
*** Importante: verificar o arquivo .env para definir onde está apontando: development ou production

# Conteúdo do arquivo .env
NODE_ENV=production

# Referências
https://sequelize.org/
https://sequelize.org/docs/v6/core-concepts/model-basics/
https://sequelize.org/docs/v6/getting-started/
https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
https://www.digitalocean.com/community/tutorials/how-to-build-a-node-js-application-with-docker
https://semaphoreci.com/community/tutorials/dockerizing-a-node-js-web-application
https://www.freecodecamp.org/portuguese/news/streams-em-node-js-tudo-o-que-voce-precisa-saber/
https://github.com/mafintosh/tar-stream
https://knexjs.org/