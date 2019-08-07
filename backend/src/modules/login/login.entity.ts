import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ParentModel } from '../../common/entity/common.entity';

@Entity()
export class Login extends ParentModel {

  @Column()
  user: string;

  @Column()
  password: string;
  
  @Column()
  token: string;

}