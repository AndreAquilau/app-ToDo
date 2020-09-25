type Code = 200 | 201 | 400 | 404 | 401 | 500;
export default interface InterfaceResposnse {
  status: (code: Code) => this;
  json: (obj: object) => this;
}
