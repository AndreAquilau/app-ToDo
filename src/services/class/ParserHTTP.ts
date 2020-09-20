import { json, urlencoded } from 'body-parser';

export default class ParserHTTP {
  json() {
    return json();
  }

  urlencoded() {
    return urlencoded({ extended: true });
  }
}
