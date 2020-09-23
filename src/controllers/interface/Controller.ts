import Request from '@routes/interface/Request';
import Response from '@routes/interface/Response';

export { Request, Response };
export default interface Controller {
  index?(request: Request, response: Response);
  show?(request: Request, response: Response);
  store?(request: Request, response: Response);
  update?(request: Request, response: Response);
  delete?(request: Request, response: Response);
}
