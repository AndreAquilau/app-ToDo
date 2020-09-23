export default interface Router {
  router;
  get(path: string, ...args: any[]): any;
  post(path: string, ...args: any[]): any;
  put(path: string, ...args: any[]): any;
  delete(path: string, ...args: any[]): any;
  use(path: string, ...args: any[]): any;
  Router();
}
