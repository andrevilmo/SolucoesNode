import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import  Cliente  from '../../../../mymodel/cliente';
import { NgForm } from '@angular/forms';
import { ModalclienteComponent } from '../../modalcliente/modalcliente.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
@Component({
  selector: 'app-welcome',
  standalone: true,
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, RouterOutlet, NzButtonModule,FormsModule, ModalclienteComponent, NzModalModule,NzTableModule,NzBreadCrumbModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})


export class WelcomeComponent implements OnInit {
  
 
  title: string = "Cadastro de cliente"
  showModal: boolean = false;
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
  novoCliente() {
    this.cliente = { id: 0, name: "", cellphone: "", email: "" } as Cliente;
    
    this.showModal = true;
  }
  // copia o cliente para ser editado.
  editCliente(cliente: Cliente) {
    this.cliente = { id: cliente.id, name: cliente.name, cellphone: cliente.cellphone, email: cliente.email } as Cliente;
    
    this.showModal = true;
  }

  fechouModal() { 
    this.showModal = false;
  }
  salvou(clienteTosave: Cliente) {
    console.log(`clienteTosave : ${JSON.stringify(clienteTosave)} `);
    if (this.cliente.id !== undefined && this.cliente.id !== 0  ) {
      this.clienteService.updateCliente(clienteTosave).subscribe(() => {
        this.showModal = false;
        this.getClientes();
        //this.cleanForm(form);
      });
    } else {
      this.clienteService.saveCliente(clienteTosave).subscribe(() => {
        this.showModal = false;
        this.getClientes();
        //this.cleanForm(form);
      });
    }
  }
  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getClientes();
    form.resetForm();
    //cliente = {} as Cliente;
  }

}
