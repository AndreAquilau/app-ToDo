import { resolve } from 'path';

export default class Static {
  staticUrl: string = process.env.STATIC_URL;

  pathStatic: string = resolve(__dirname, '..', '..', process.env.STATIC);
}
