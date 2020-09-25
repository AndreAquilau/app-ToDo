import Task from '@model/interface/Task';
import Next from '@routes/interface/Next';
import Request from '@routes/interface/Request';
import Response from '@routes/interface/Response';
import Param from '@routes/interface/Param';
import TaskModel from '@model/TaskModel';
import { getRepository } from 'typeorm';
import validator from './Validate';

export default async (
  request: Request<Task, Param>,
  response: Response,
  next: Next,
) => {
  try {
    const { id } = request.params;
    const errors: Array<object> = [];
    if (!id) {
      return response.status(404).json({
        errors: [{ message: 'id is required' }],
      });
    }

    const exist = await getRepository(TaskModel).findOne({
      where: {
        id,
      },
    });

    if (!exist)
      errors.push({
        message: `task not exists`,
      });

    if (!validator.isUUID(id)) {
      return response.status(404).json({
        errors: [{ message: 'id is invalid' }],
      });
    }

    if (errors.length > 0)
      return response.status(404).json({
        errors,
      });

    next();
  } catch (err) {
    return response.status(404).json({ errors: [{ message: err.message }] });
  }
};
