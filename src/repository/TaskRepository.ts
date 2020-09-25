import TaskModel from '@model/TaskModel';
import { EntityRepository, Repository } from 'typeorm';
import InterfaceTaskRepository from './interface/TaskRepository';

@EntityRepository(TaskModel)
export default class TaskRepository
  extends Repository<TaskModel>
  implements InterfaceTaskRepository {
  async taskById(id: string): Promise<any> {
    return await this.find({
      where: { id },
      order: {
        when: 'ASC',
      },
    });
  }

  async taskByMacaddress(macaddress: string): Promise<any> {
    return await this.find({
      where: { macaddress },
      order: {
        when: 'ASC',
      },
    });
  }
}
