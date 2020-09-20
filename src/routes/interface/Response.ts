export default interface InterfaceResposnse {
  status: (number) => this;
  json: (obj: object) => this;
}
