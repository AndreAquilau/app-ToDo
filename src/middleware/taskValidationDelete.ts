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

    if (!id) {
      return response.status(404).json({
        errors: [{ message: 'id is required' }],
      });
    }

    if (!validator.isUUID(id)) {
      return response.status(404).json({
        errors: [{ message: 'identent is invalid' }],
      });
    }
    const exist = await getRepository(TaskModel).findOne({ id });

    if (!exist) errors.push({ message: 'task not exists' });

    if (errors.length > 0)
      return response.status(404).json({
        errors,
      });
    next();
  } catch (err) {
    return response
      .status(404)
      .json({ errors: [{ message: `not authenticate ${err}` }] });
  }
};
