import TaskModel from '@model/TaskModel';
import { EntityRepository, In, Like, Repository } from 'typeorm';
import InterfaceTaskRepository from './interface/TaskRepository';
import DateConversion from '../class/DateConversion';

@EntityRepository(TaskModel)
export default class TaskRepository
  extends Repository<TaskModel<Date>>
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

  async taskUpdateStatus(id: string, done: boolean): Promise<any> {
    return await this.update({ id }, { done });
  }

  async lateTask(macaddress): Promise<any> {
    try {
      const current = Date.now();
      const dateConversion = new DateConversion();

      console.log(dateConversion.timeStamp(current));

      return await this.query(
        `SELECT * FROM task WHERE "when" < '${dateConversion.timeStamp(
          current,
        )}' and macaddress = '${macaddress}' ORDER BY "when" ASC`,
      );
    } catch (err) {
      return Promise.reject(err.message);
    }
  }

  async todayTask(macaddress): Promise<any> {
    try {
      const current = Date.now();
      const date = new DateConversion().timeStamp(current);
      const [today, times] = date.split('T');
      return await this.find({
        where: { when: Like(`'%${today}%'`), macaddress },
      });
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
