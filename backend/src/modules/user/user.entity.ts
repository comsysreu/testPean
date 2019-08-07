import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ParentModel } from '../../common/entity/common.entity';

@Entity()
export class User extends ParentModel  {

  @Column()
  cod: number;

  @Column({ length: 500 })
  name: string;

  @Column()
  position: number;

  @Column()
  user: string;

  @Column()
  password: string;

}