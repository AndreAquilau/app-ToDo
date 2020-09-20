export default interface InterfaceApp {
  app: object;

  adapter(module);
  adapterStaticFiles(baseUrl: string, path: string);
  start(port: string);
}
