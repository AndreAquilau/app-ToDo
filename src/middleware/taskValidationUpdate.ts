import Task from '@model/interface/Task';
import TaskModel from '@model/TaskModel';
import Next from '@routes/interface/Next';
import Request from '@routes/interface/Request';
import Response from '@routes/interface/Response';
import { getRepository } from 'typeorm';
import Param from '@routes/interface/Param';
import validator from './Validate';

export default async (
  request: Request<Task, Param>,
  response: Response,
  next: Next,
) => {
  try {
    const errors: Array<object> = [];
    const { id } = request.params;
    const { macaddress, when } = request.body;

    const exist = await getRepository(TaskModel).findOne({
      where: {
        when: new Date(when || '01/12/2999'),
        macaddress: !macaddress ? '' : macaddress,
      },
    });

    if (!id) errors.push({ message: 'id is required' });

    if (!validator.isUUID(id)) {
      return response.status(404).json({
        errors: [{ message: 'identent is invalid' }],
      });
    }

    if (validator.isPastDate(new Date(when || '01/12/2999')) && when)
      errors.push({ message: 'when is Past', value: when });

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
