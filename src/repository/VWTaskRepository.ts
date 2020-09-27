import { EntityRepository, In, Like, Repository } from 'typeorm';
import VWTask from '@model/VW_Task';
import DateConversion from '../class/DateConversion';

@EntityRepository(VWTask)
export default class VWTaskRepository extends Repository<VWTask> {
  async todayTask(macaddress): Promise<any> {
    try {
      const current = Date.now();
      const date = new DateConversion().timeStamp(current);
      const [today, times] = date.split('T');

      console.log(today);
      return await this.find({
        where: { when: Like(`%${today}%`), macaddress },
      });
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
