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
