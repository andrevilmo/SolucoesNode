import { Sequelize } from 'sequelize-typescript';
import 'dotenv/config'
const config = require('config'); 
const sequelize = new Sequelize({
  database:  "cliente" ,
  host:  "172.35.0.3" ,
  port:  3306 ,
  dialect:  "mysql" ,
  username: "root" ,
  password:  "root" ,
  storage: ":memory:",
  models: [__dirname + '/dbmodels/*.model.ts'], 
});

export default {bootstrap: sequelize}