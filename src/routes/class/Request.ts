import InterfaceRequest from '../interface/Request';

export default class Request implements InterfaceRequest {
  body: object;

  params: object;

  headers: object;
}
