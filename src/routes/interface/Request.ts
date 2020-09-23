export default interface InterfaceRequest<Body> {
  body: Body;
  params: object;
  headers: object;
}
