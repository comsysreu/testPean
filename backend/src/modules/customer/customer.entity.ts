import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ParentModel } from '../../common/entity/common.entity';

@Entity()
export class Customer extends ParentModel {

  @Column()
  cod: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  age: number;

}