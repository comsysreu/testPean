import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ParentModel } from '../../common/entity/common.entity';

@Entity()
export class Departament extends ParentModel {

  @Column()
  cod: number;

  @Column()
  name: string;

  @Column()
  description: string;

}