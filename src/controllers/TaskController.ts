import { getRepository, getCustomRepository } from 'typeorm';
import TaskModel from '@model/TaskModel';
import TaskRepository from '@repository/TaskRepository';
import VWTaskRepository from '@repository/VWTaskRepository';

class TaskController {
  async store(request, response) {
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

  async index(request, response) {
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

  async update(request, response) {
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

  async delete(request, response) {
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

  async allMacaddress(request, response) {
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

  async show(request, response) {
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

  async done(request, response) {
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

  async late(request, response) {
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

  async today(request, response) {
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

  async week(request, response) {
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

  async month(request, response) {
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

  async year(request, response) {
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
