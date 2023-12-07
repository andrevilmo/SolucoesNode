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
- npm run migrate (para criar o banco)
- npm run start
*** Importante: verificar o arquivo .env para definir onde está apontando: development ou production

# Conteúdo do arquivo .env
NODE_ENV=production


*** Importante : não é possíve subir o arquivo de dump.tar.gz no git pois é muito grande.
Para fins de teste colocar o arquivo de teste em Teste1\node\code\public\images\dump.targ.gz
# Referências
https://www.digitalocean.com/community/tutorials/how-to-build-a-node-js-application-with-docker
https://semaphoreci.com/community/tutorials/dockerizing-a-node-js-web-application
https://www.freecodecamp.org/portuguese/news/streams-em-node-js-tudo-o-que-voce-precisa-saber/
https://github.com/mafintosh/tar-stream
https://knexjs.org/