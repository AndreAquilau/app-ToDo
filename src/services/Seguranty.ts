import helmet from 'helmet';

export default class Seguranty {
  headers() {
    return helmet();
  }
}
