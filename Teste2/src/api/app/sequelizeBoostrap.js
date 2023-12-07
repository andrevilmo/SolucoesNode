"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
require("dotenv/config");
const config = require('config');
const sequelize = new sequelize_typescript_1.Sequelize({
    database: "cliente",
    host: "172.35.0.3",
    port: 3306,
    dialect: "mysql",
    username: "root",
    password: "root",
    storage: ":memory:",
    models: [__dirname + '/dbmodels/*.model.ts'],
});
exports.default = { bootstrap: sequelize };
