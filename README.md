## Documentação das Libs Utilizadas no Projeto

### Express
  * helmet
  * morgan
  * body-parser
  * cors
### Typeorm
  * uuidv4
  * reflect-metadata
  * pg
----------------------------------------------------------------------------------
##### Entity
~~~ts
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Task from './interface/Task';

@Index('pkey_task', ['id'], { unique: true })
@Entity('task')
export default class TaskModel<whenType> implements Task<whenType> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'macaddress', type: 'varchar', length: 255, nullable: false })
  macaddress: string;

  @Column({ name: 'type', type: 'integer', nullable: false })
  type: number;

  @Column({ name: 'title', type: 'varchar', length: 255, nullable: false })
  title: string;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  description: string;

  @Column({
    name: 'when',
    type: 'timestamp',
    nullable: false,
  })
  when: whenType;

  @Column({
    name: 'done',
    type: 'boolean',
    nullable: true,
    default: false,
  })
  done: boolean;

  @CreateDateColumn({
    name: 'created_At',
    type: 'timestamp',
    default: 'now()',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_At',
    type: 'timestamp',
    default: 'now()',
    nullable: false,
  })
  updatedAt: Date;
}
~~~
-------------------------------------------------------------------------------------------------
#### ViewEntity
~~~ts
import TaskModel from '@model/TaskModel';
import { Column, ViewEntity } from 'typeorm';

@ViewEntity({ name: 'vw_task' })
export default class VWTask extends TaskModel<string> {
  @Column({
    name: 'when',
    type: 'text',
    nullable: false,
  })
  when: string;
}
~~~
### Validator
### Date-fns
