import Request from './Request';
import Response from './Response';

export default interface InterfaceRouter {
  router: object;

  adapterMiddleware(useUrl: string, middleware): void;

  adapterGet(
    useUrl: string,
    middleware: (req: Request, res: Response) => {},
  ): void;

  adapterPost(
    useUrl: string,
    middleware: (req: Request, res: Response) => {},
  ): void;

  adapterPut(
    useUrl: string,
    middleware: (req: Request, res: Response) => {},
  ): void;

  adapterDelete(
    useUrl: string,
    middleware: (req: Request, res: Response) => {},
  ): void;

  adapterRouter();
}
