import { EntityRepository, Like, Repository } from 'typeorm';
import VWTask from '@model/VW_Task';
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  endOfYear,
  startOfYear,
} from 'date-fns';
import DateConversion from '../class/DateConversion';

@EntityRepository(VWTask)
export default class VWTaskRepository extends Repository<VWTask> {
  async todayTask(macaddress): Promise<any> {
    try {
      const current = Date.now();
      const date = new DateConversion().timeStamp(current);
      const [today, times] = date.split('T');

      return await this.find({
        where: { when: Like(`%${today}%`), macaddress },
      });
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async weekTask(macaddress): Promise<any> {
    try {
      const current = Date.now();
      const startTimeZone =
        startOfWeek(current).getTimezoneOffset() * 60 * 1000;
      const endTimeZone = endOfWeek(current).getTimezoneOffset() * 60 * 1000;
      const [start, _start] = new DateConversion()
        .timeStamp(startOfWeek(current - startTimeZone))
        .split('T');
      const [end, _end] = new DateConversion()
        .timeStamp(endOfWeek(current - endTimeZone))
        .split('T');

      const res = await this.query(
        `select * from vw_task where "when" >= '${start}' AND "when" <= '${end}' AND macaddress = '${macaddress}'`,
      );
      return res;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async monthTask(macaddress): Promise<any> {
    try {
      const current = Date.now();
      const startTimeZone =
        startOfMonth(current).getTimezoneOffset() * 60 * 1000;
      const endTimeZone = endOfMonth(current).getTimezoneOffset() * 60 * 1000;
      const [start, _start] = new DateConversion()
        .timeStamp(startOfMonth(current - startTimeZone))
        .split('T');
      const [end, _end] = new DateConversion()
        .timeStamp(endOfMonth(current - endTimeZone))
        .split('T');

      const res = await this.query(
        `select * from vw_task where "when" >= '${start}' AND "when" <= '${end}' AND macaddress = '${macaddress}'`,
      );
      return res;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async yearTask(macaddress): Promise<any> {
    try {
      const current = Date.now();
      const startTimeZone =
        startOfYear(current).getTimezoneOffset() * 60 * 1000;
      const endTimeZone = endOfYear(current).getTimezoneOffset() * 60 * 1000;
      const [start, _start] = new DateConversion()
        .timeStamp(startOfYear(current - startTimeZone))
        .split('T');
      const [end, _end] = new DateConversion()
        .timeStamp(endOfYear(current - endTimeZone))
        .split('T');
      console.log(start, end);

      const res = await this.query(
        `select * from vw_task where "when" >= '${start}' AND "when" <= '${end}' AND macaddress = '${macaddress}'`,
      );
      return res;
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
