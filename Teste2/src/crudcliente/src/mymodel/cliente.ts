import { Table, Column, Model, HasMany } from 'sequelize-typescript';

@Table
class Cliente extends Model {
  @Column
  name: string = "";

  @Column
  cellphone: string = ""; 

  @Column
  email: string = "";
}

export default Cliente