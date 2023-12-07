import { Table, Column, Model, HasMany } from 'sequelize-typescript';
//export module Cliente {
  @Table
  export class Cliente extends Model {
    @Column
    name: string = "";
  
    @Column
    celphone: string = "";
  
    @Column
    email: string = "";
  }
//}
export default Cliente
