export default interface InterfaceRequest<Body, Params> {
  body: Body;
  params: Params;
  headers: object;
}
