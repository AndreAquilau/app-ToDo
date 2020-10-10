import Task from '@model/interface/Task';
import TaskModel from '@model/TaskModel';
import Next from '@routes/interface/Next';
import Request from '@routes/interface/Request';
import Response from '@routes/interface/Response';
import { getRepository, In } from 'typeorm';
import Param from '@routes/interface/Param';
import validator from './Validate';
import DateConversion from '../class/DateConversion';

export default async (
  request: Request<Task<Date>, Param>,
  response: Response,
  next: Next,
) => {
  try {
    const errors: Array<object> = [];
    const { id } = request.params;
    const { when } = request.body;

    const exist = await getRepository(TaskModel).findOne({
      where: {
        id,
      },
    });
    const timeZone = 60 * 1000;
    const time = String(new Date(Date.now() + timeZone)).split(' ')[4];

    if (!id) errors.push({ message: 'id is required' });

    if (!validator.isUUID(id)) {
      return response.status(404).json({
        errors: [{ message: 'identent is invalid' }],
      });
    }

    if (validator.isPastDate(when))
      errors.push({ message: 'when is Past', value: when });

    console.log(exist);
    if (!exist)
      errors.push({
        message: `task not exists`,
      });

    if (exist && exist.id !== id)
      errors.push({
        message: `task exists, modify date try new.`,
        value: when,
      });

    if (errors.length > 0)
      return response.status(404).json({
        errors,
      });

    next();
  } catch (err) {
    return response.status(404).json({ errors: [{ message: err.message }] });
  }
};
