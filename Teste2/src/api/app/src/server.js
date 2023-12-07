"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const app = (0, express_1.default)();
const route = (0, express_2.Router)();
require("dotenv/config");
const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, '..', '.env') });
app.use(express_1.default.json());
const cliente_dbmodel_1 = __importDefault(require("../dbmodel/cliente.dbmodel"));
const bootstrap = __importStar(require("../sequelizeBoostrap"));
route.get('/cliente', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    bootstrap.default.bootstrap.addModels([cliente_dbmodel_1.default]);
    const allClientes = yield cliente_dbmodel_1.default.findAll();
    console.log(allClientes);
    res.json(allClientes);
}));
route.post('/cliente', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    bootstrap.default.bootstrap.addModels([cliente_dbmodel_1.default]);
    var toSave = cliente_dbmodel_1.default.build(req.body);
    yield toSave.save();
    const allClientes = yield cliente_dbmodel_1.default.findAll();
    res.json(allClientes);
}));
route.put('/cliente/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newTodo = req.body;
    bootstrap.default.bootstrap.addModels([cliente_dbmodel_1.default]);
    yield cliente_dbmodel_1.default.update({
        id: req.params.id,
        name: newTodo.name,
        cellphone: newTodo.cellphone,
        email: newTodo.email,
    }, { where: { id: newTodo.id } }).then(() => { });
    const allClientes = yield cliente_dbmodel_1.default.findAll();
    res.json(allClientes);
}));
route.delete('/cliente/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    bootstrap.default.bootstrap.addModels([cliente_dbmodel_1.default]);
    var toSave = cliente_dbmodel_1.default.build({ id: req.params.id });
    yield toSave.destroy();
    const allClientes = yield cliente_dbmodel_1.default.findAll();
    res.json(allClientes);
}));
app.use(route);
app.listen(3333, () => 'server running on port 3333');
