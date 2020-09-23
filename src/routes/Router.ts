import { Router } from 'express';
import RouterInterface from './interface/Router';

class RouterExpress implements RouterInterface {
  router = Router();

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

export default new RouterExpress().Router();
