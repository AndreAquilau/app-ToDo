import { Router } from 'express';
import Request from './interface/Request';
import Response from './interface/Response';
import InterfaceRouter from './interface/Router';

export default class RouterAdapterExpress implements InterfaceRouter {
  constructor(public router: Router) {}

  adapterMiddleware(
    useUrl: string,
    middleware: (req: Request, res: Response) => any,
  ) {
    this.router.use(useUrl, middleware);
  }

  adapterGet(useUrl: string, middleware: (req: Request, res: Response) => any) {
    this.router.get(useUrl, middleware);
  }

  adapterPost(
    useUrl: string,
    middleware: (req: Request, res: Response) => any,
  ) {
    this.router.post(useUrl, middleware);
  }

  adapterPut(useUrl: string, middleware: (req: Request, res: Response) => any) {
    this.router.put(useUrl, middleware);
  }

  adapterDelete(
    useUrl: string,
    middleware: (req: Request, res: Response) => any,
  ) {
    this.router.delete(useUrl, middleware);
  }

  adapterRouter() {
    return this.router;
  }
}
