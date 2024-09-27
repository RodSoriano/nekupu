import { Entity, Column, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../common/entities/base-entity.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Contact extends BaseEntity {
  @Column('varchar', {
    nullable: false,
  })
  fullName: string;

  @Column('varchar', {
    nullable: false,
  })
  country: string;

  @Column('varchar', {
    nullable: false,
  })
  email: string;

  @Column('varchar', {
    nullable: true,
  })
  phone: string;

  @ManyToOne(() => User, (user) => user.contacts)
  user: User;
}
