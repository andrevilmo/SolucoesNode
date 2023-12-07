import express from 'express'

import { Router, Request, Response } from 'express';

const app = express();

const route = Router()
import 'dotenv/config'
const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, '..', '.env') });
app.use(express.json())
import Cliente from '../dbmodel/cliente.dbmodel';
import * as bootstrap from '../sequelizeBoostrap'
route.get('/cliente', async (req: Request, res: Response) => {
  bootstrap.default.bootstrap.addModels([Cliente]);
  const allClientes = await Cliente.findAll();
  console.log(allClientes);
  res.json(allClientes)
})
route.post('/cliente', async (req: Request, res: Response) => {
    bootstrap.default.bootstrap.addModels([Cliente]);
    var toSave = Cliente.build(req.body);
    await toSave.save();
    const allClientes = await  Cliente.findAll();
    res.json(allClientes)
  })
  route.put('/cliente/:id', async (req: Request, res: Response) => {
    const newTodo = req.body as Cliente;
    bootstrap.default.bootstrap.addModels([Cliente]);
    await Cliente.update(
        {
          id: req.params.id,
          name: newTodo.name,
          cellphone: newTodo.cellphone,
          email: newTodo.email,
        },
        { where: { id: newTodo.id } }
      ).then(() => {});
    const allClientes = await  Cliente.findAll();
    res.json(allClientes)
  })
  route.delete('/cliente/:id', async (req: Request, res: Response) => {
    bootstrap.default.bootstrap.addModels([Cliente]);
    var toSave = Cliente.build({id: req.params.id});
    await toSave.destroy();
    const allClientes = await  Cliente.findAll();
    res.json(allClientes)
  })
app.use(route)
app.listen(3333, () => 'server running on port 3333')