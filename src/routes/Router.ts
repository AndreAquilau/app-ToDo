import { Router } from 'express';
import RouterInterface from './interface/Router';

export default class RouterAdapter implements RouterInterface {
  router: Router;

  constructor() {
    this.router = Router();
  }

  use(path: any, ...args: any[]) {
    this.router.use(path, ...args);
  }

  get(path, ...args: any[]) {
    this.router.get(path, ...args);
  }

  post(path, ...args: any[]) {
    this.router.post(path, ...args);
  }

  put(path, ...args: any[]) {
    this.router.put(path, ...args);
  }

  delete(path, ...args: any[]) {
    this.router.delete(path, ...args);
  }

  Router() {
    return this.router;
  }
}
