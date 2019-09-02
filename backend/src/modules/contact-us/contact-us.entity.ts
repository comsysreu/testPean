import { Entity, Column } from 'typeorm';
import { ParentModel } from '../../common/entity/common.entity';

@Entity()
export class ContactUs extends ParentModel {

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: number;

}