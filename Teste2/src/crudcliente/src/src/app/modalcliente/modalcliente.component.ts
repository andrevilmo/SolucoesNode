import { Component, NO_ERRORS_SCHEMA, Input, Output, EventEmitter  } from '@angular/core';
import { FormclienteComponent } from '../formcliente/formcliente.component';
import { FormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import Cliente from '../../../mymodel/cliente';

@Component({
  standalone: true,
  schemas: [NO_ERRORS_SCHEMA],
  
  selector: 'app-modalcliente',
  templateUrl: './modalcliente.component.html',
  imports: [FormclienteComponent, FormsModule,NzModalModule]
})
export class ModalclienteComponent {
  @Input()
  cliente: Cliente | undefined;
  @Input()
  isVisible : boolean = false;
  isOkLoading = false;
  @Output() fechou = new EventEmitter<void>();
  @Output() salvou = new EventEmitter<Cliente>();
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    console.log(this.cliente);
    this.salvou.emit(this.cliente);
    this.isOkLoading = false;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.fechou.emit();
    this.isOkLoading = false;
  }
}
