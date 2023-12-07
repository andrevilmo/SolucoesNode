import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import  Cliente  from '../../../../mymodel/cliente';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NzButtonModule,FormsModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})


export class WelcomeComponent implements OnInit {
  
 
  title: string = "Cadastro de cliente"
  
  cliente = {} as Cliente;
  clientes:  any[] = []; 

  constructor(private clienteService: ClienteService) {}
  
  ngOnInit() {
    this.getClientes();
  }

  // defini se um cliente será criado ou atualizado
  saveCliente(form: NgForm) {
    if (this.cliente.id !== undefined) {
      this.clienteService.updateCliente(this.cliente).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.clienteService.saveCliente(this.cliente).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obtém todos os clientes
  getClientes() {
    this.clienteService.getClientes().subscribe((clientes: Cliente[]) => {
      this.clientes = clientes;
    });
  }

  // deleta um cliente
  deleteCliente(cliente: Cliente) {
    this.clienteService.deleteCliente(cliente).subscribe(() => {
      this.getClientes();
    });
  }

  // copia o cliente para ser editado.
  editCliente(cliente: Cliente) {
    this.cliente = { id: cliente.id, name: cliente.name, cellphone: cliente.cellphone, email: cliente.email } as Cliente;
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getClientes();
    form.resetForm();
    //cliente = {} as Cliente;
  }

}
