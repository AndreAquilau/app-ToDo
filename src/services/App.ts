import express, { Application } from 'express';

export default class App {
  constructor(public app: Application) {}

  adapter(module) {
    this.app.use(module);
  }

  adapterStatic(baseUrl: string, path: string) {
    this.app.use(baseUrl, express.static(path));
  }

  start(port: string) {
    this.app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  }
}
