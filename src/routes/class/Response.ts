import InterfaceResposnse from '../interface/Response';

export default class Response implements InterfaceResposnse {
  status: (number: any) => this;

  json: (obj: object) => this;
}
