import Request from '@routes/interface/Request';
import Response from '@routes/interface/Response';

export { Request, Response };
export default interface Controller<Body, Param> {
  index?(request: Request<Body, Param>, response: Response);
  show?(request: Request<Body, Param>, response: Response);
  store?(request: Request<Body, Param>, response: Response);
  update?(request: Request<Body, Param>, response: Response);
  delete?(request: Request<Body, Param>, response: Response);
}
