import Controller, {
  Response,
  Request,
} from '@controllers/interface/Controller';
import { getRepository, getCustomRepository } from 'typeorm';
import TaskModel from '@model/TaskModel';
import Task from '@model/interface/Task';
import Param from '@routes/interface/Param';
import TaskRepository from '@repository/TaskRepository';
import VWTaskRepository from '@repository/VWTaskRepository';

class TaskController implements Controller<Task<Date>, Param> {
  async store(request: Request<Task<Date>, Param>, response: Response) {
    try {
      const task = getRepository(TaskModel);
      console.log(request.body.when);
      const res = await task.save(request.body);
      return response.status(201).json(res);
    } catch (error) {
      console.log(`Error ${error.message}`);
      return response.status(500).json({
        error: ['Error is not Authorization'],
      });
    }
  }

  async index(request: Request<Task<Date>, Param>, response: Response) {
    try {
      const task = getRepository(TaskModel);
      const res = await task.find();
      return response.status(200).json(res);
    } catch (error) {
      console.log(`Error ${error.message}`);
      return response.status(500).json({
        error: ['Error is not Authorization'],
      });
    }
  }

  async update(request: Request<Task<Date>, Param>, response: Response) {
    try {
      const { id } = request.params;

      const task = getRepository(TaskModel);
      const res = await task.update({ id }, request.body);

      return response.status(200).json(res);
    } catch (err) {
      console.log(err.message, err);
      return response.status(500).json({
        errors: ['Error in update task'],
      });
    }
  }

  async delete(request: Request<Task<Date>, Param>, response: Response) {
    try {
      const { id } = request.params;
      console.log(`Cheguei no Controller`);

      const task = getRepository(TaskModel);
      const res = await task.delete({ id });

      return response.status(200).json(res);
    } catch (err) {
      console.log(err.message);
      return response.status(500).json({
        errors: ['Error in update task'],
      });
    }
  }

  async allMacaddress(request: Request<Task<Date>, Param>, response: Response) {
    try {
      const { macaddress } = request.params;

      const task = await getCustomRepository(TaskRepository).taskByMacaddress(
        macaddress,
      );

      return response.status(200).json(task);
    } catch (err) {
      console.log(err.message);
      return response.status(500).json({
        errors: ['Error in task show'],
      });
    }
  }

  async show(request: Request<Task<Date>, Param>, response: Response) {
    try {
      const { id } = request.params;

      const task = await getCustomRepository(TaskRepository).taskById(id);

      return response.status(200).json(task);
    } catch (err) {
      console.log(err.message);
      return response.status(500).json({
        errors: ['Error in task show'],
      });
    }
  }

  async done(request: Request<Task<Date>, Param>, response: Response) {
    try {
      const { id, done } = request.params;

      if (!(typeof done === 'boolean')) {
        return response.status(500).json({
          errors: ['Error in update task'],
        });
      }

      const task = await getCustomRepository(TaskRepository).taskUpdateStatus(
        id,
        done,
      );

      return response.status(200).json(task);
    } catch (err) {
      console.log(err.message);
      return response.status(500).json({
        errors: ['Error in update task'],
      });
    }
  }

  async late(request: Request<Task<Date>, Param>, response: Response) {
    try {
      const { macaddress } = request.params;

      const tasks = await getCustomRepository(TaskRepository).lateTask(
        macaddress,
      );

      return response.status(200).json(tasks);
    } catch (err) {
      return response.status(500).json({
        errors: [{ message: err }],
      });
    }
  }

  async today(request: Request<Task<string>, Param>, response: Response) {
    try {
      const { macaddress } = request.params;

      const tasks = await getCustomRepository(VWTaskRepository).todayTask(
        macaddress,
      );

      return response.status(200).json(tasks);
    } catch (err) {
      return response.status(500).json({
        errors: [{ message: err }],
      });
    }
  }

  async week(request: Request<Task<string>, Param>, response: Response) {
    try {
      const { macaddress } = request.params;

      const tasks = await getCustomRepository(VWTaskRepository).weekTask(
        macaddress,
      );
      return response.status(200).json(tasks);
    } catch (err) {
      return response.status(500).json({
        errors: [{ message: err.message }],
      });
    }
  }

  async month(request: Request<Task<string>, Param>, response: Response) {
    try {
      const { macaddress } = request.params;

      const tasks = await getCustomRepository(VWTaskRepository).monthTask(
        macaddress,
      );
      return response.status(200).json(tasks);
    } catch (err) {
      return response.status(500).json({
        errors: [{ message: err.message }],
      });
    }
  }

  async year(request: Request<Task<string>, Param>, response: Response) {
    try {
      const { macaddress } = request.params;

      const tasks = await getCustomRepository(VWTaskRepository).yearTask(
        macaddress,
      );
      return response.status(200).json(tasks);
    } catch (err) {
      return response.status(500).json({
        errors: [{ message: err.message }],
      });
    }
  }
}

export default new TaskController();
