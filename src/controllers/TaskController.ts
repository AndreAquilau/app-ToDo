import Controller, {
  Response,
  Request,
} from '@controllers/interface/Controller';
import { getRepository } from 'typeorm';
import TaskModel from '@model/TaskModel';
import Task from '@model/interface/Task';

class TaskController implements Controller {
  async store(request: Request<Task>, response: Response) {
    try {
      const task = getRepository(TaskModel);
      const res = await task.save(request.body);
      return response.status(201).json({
        task: res,
      });
    } catch (error) {
      console.log(`Error ${error.message}`);
      return response.status(400).json({
        error: ['Error is not Authorization'],
      });
    }
  }

  async index(request: Request<Task>, response: Response) {
    try {
      const task = getRepository(TaskModel);
      const res = await task.find();
      return response.status(200).json({
        task: res,
      });
    } catch (error) {
      console.log(`Error ${error.message}`);
      return response.status(400).json({
        error: ['Error is not Authorization'],
      });
    }
  }
}

export default new TaskController();
