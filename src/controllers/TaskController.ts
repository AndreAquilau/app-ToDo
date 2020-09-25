import Controller, {
  Response,
  Request,
} from '@controllers/interface/Controller';
import { getRepository, getCustomRepository } from 'typeorm';
import TaskModel from '@model/TaskModel';
import Task from '@model/interface/Task';
import Param from '@routes/interface/Param';
import TaskRepository from '@repository/TaskRepository';
import { id } from 'date-fns/locale';

class TaskController implements Controller<Task, Param> {
  async store(request: Request<Task, Param>, response: Response) {
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

  async index(request: Request<Task, Param>, response: Response) {
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

  async update(request: Request<Task, Param>, response: Response) {
    try {
      const { id } = request.params;

      const task = getRepository(TaskModel);
      const res = await task.update({ id }, request.body);

      return response.status(200).json({
        data: res,
      });
    } catch (err) {
      console.log(err.message);
      return response.status(400).json({
        errors: ['Error in update task'],
      });
    }
  }

  async delete(request: Request<Task, Param>, response: Response) {
    try {
      const { id } = request.params;
      console.log(`Cheguei no Controller`);

      const task = getRepository(TaskModel);
      const res = await task.delete({ id });

      return response.status(200).json({
        data: res,
      });
    } catch (err) {
      console.log(err.message);
      return response.status(400).json({
        errors: ['Error in update task'],
      });
    }
  }

  async allMacaddress(request: Request<Task, Param>, response: Response) {
    try {
      const { macaddress } = request.body;

      const task = await getCustomRepository(TaskRepository).taskByMacaddress(
        macaddress,
      );

      return response.status(200).json({
        data: task,
      });
    } catch (err) {
      console.log(err.message);
      return response.status(400).json({
        errors: ['Error in task show'],
      });
    }
  }

  async show(request: Request<Task, Param>, response: Response) {
    try {
      const { id } = request.params;

      const task = await getCustomRepository(TaskRepository).taskById(id);

      return response.status(200).json({
        data: task,
      });
    } catch (err) {
      console.log(err.message);
      return response.status(400).json({
        errors: ['Error in task show'],
      });
    }
  }
}

export default new TaskController();
