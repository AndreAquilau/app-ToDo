import express, { Application } from 'express';
import InterfaceApp from './interface/App';

export default class AppAdapterExpress implements InterfaceApp {
  constructor(public app: Application) {}

  adapter(module) {
    this.app.use(module);
  }

  adapterStaticFiles(baseUrl: string, path: string) {
    this.app.use(baseUrl, express.static(path));
  }

  start(port: string) {
    this.app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  }
}
