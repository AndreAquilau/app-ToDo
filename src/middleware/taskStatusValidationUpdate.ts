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
    const { id, done } = request.params;

    if (!done || !id)
      return response
        .status(404)
        .json({ errors: [{ message: 'id and done is required' }] });

    if (done === 'false') request.params.done = false;
    if (done === 'true') request.params.done = true;

    next();
  } catch (err) {
    return response.status(500).json({ errors: [{ message: err.message }] });
  }
};
