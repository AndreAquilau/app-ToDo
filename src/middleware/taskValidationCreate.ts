import Task from '@model/interface/Task';
import TaskModel from '@model/TaskModel';
import Next from '@routes/interface/Next';
import Request from '@routes/interface/Request';
import Response from '@routes/interface/Response';
import { getRepository } from 'typeorm';
import Param from '@routes/interface/Param';
import validate from './Validate';

export default async (
  request: Request<Task, Param>,
  response: Response,
  next: Next,
) => {
  const errors: Array<object> = [];

  const { macaddress, type, title, description, when, done } = request.body;
  const exist = await getRepository(TaskModel).findOne({
    where: {
      when: new Date(when),
      macaddress: macaddress || '',
    },
  });

  if (!macaddress && macaddress !== '')
    errors.push({ message: 'macaddress is required', value: macaddress });

  if (!type) errors.push({ messae: 'type is required', value: type });

  if (!title) errors.push({ message: 'title is required', value: title });

  if (!description)
    errors.push({ message: 'description is required', value: description });

  if (!when) errors.push({ message: 'when is required', value: done });

  if (typeof done !== 'boolean')
    errors.push({ message: 'done is invalid type boolean', value: when });

  if (validate.isPastDate(new Date(when)) && when)
    errors.push({ message: 'when is Past', value: when });

  if (exist)
    errors.push({
      message: `task exists, modify date try new.`,
      value: when,
    });

  if (errors.length > 0)
    return response.status(404).json({
      errors,
    });

  next();
};
