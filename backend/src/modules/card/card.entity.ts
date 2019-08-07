import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { ParentModel } from '../../common/entity/common.entity';
import { Customer } from '../customer/customer.entity';

@Entity()
export class Card extends ParentModel {

  @Column()
  cod: number;

  @Column()
  rode: number;

  @Column()
  balance: number;

  @Column()
  validity: Date;

  @ManyToOne(type => Customer, customer => customer.id)
  @JoinColumn()
  customer: Customer;

}