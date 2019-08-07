import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { ParentModel } from '../../common/entity/common.entity';
import { Card } from '../card/card.entity';
import { Store } from '../store/store.entity';
import { User } from '../user/user.entity';

@Entity()
export class Transaction extends ParentModel {

  @Column()
  authorization: string;

  @ManyToOne(type => Card, card => card.id)
  @JoinColumn()
  card: Card;

  @Column()
  sale: number;

  @Column()
  date_sale: Date;

  @ManyToOne(type => Store, store => store.id)
  @JoinColumn()
  store: Store;
  
  @Column()
  discount_rate: number;
  
  @Column()
  discount_sale: number;
  
  @Column()
  total: number;
  
  @ManyToOne(type => User, user => user.id)
  @JoinColumn()
  user: User;
}