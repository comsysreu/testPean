import { Entity, Column } from 'typeorm';
import { ParentModel } from '../../common/entity/common.entity';

@Entity()
export class Profile extends ParentModel {

  @Column()
  cod: number;

  @Column()
  name: string;

  @Column()
  description: string;

}