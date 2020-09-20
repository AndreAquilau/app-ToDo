import morgan from 'morgan';

export default class Debugging {
  request() {
    return morgan('dev');
  }
}
