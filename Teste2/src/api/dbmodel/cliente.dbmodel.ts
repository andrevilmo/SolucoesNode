import { Table, Column, Model, HasMany } from 'sequelize-typescript';

@Table
export default class Cliente extends Model {
  @Column
    name!: string;

  @Column
    cellphone!: string;

  @Column
    email!: string;
}
