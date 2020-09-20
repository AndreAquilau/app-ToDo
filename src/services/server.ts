import '@config/env';
import 'reflect-metadata';
import database from '@database/index';
import express from 'express';
import routes from '@routes/index';
import App from './AppAdapterExpress';
import Seguranty from './class/Seguranty';
import Debugging from './class/Debugging';
import ParserHTTP from './class/ParserHTTP';
import Domain from './class/Domain';
import Static from './class/Static';

const app = new App(express());
const seguranty = new Seguranty();
const debugging = new Debugging();
const filestatic = new Static();
const domain = new Domain();
const parserHTTP = new ParserHTTP();

app.adapter(seguranty.headers());
app.adapter(debugging.request());
app.adapterStaticFiles(filestatic.staticUrl, filestatic.pathStatic);
app.adapter(domain.origin());
app.adapter(parserHTTP.urlencoded());
app.adapter(parserHTTP.json());
app.adapter(routes);

database
  .then(() => {
    console.log('CONNETION DATABASE SUCCESS');
    app.start(process.env.PORT);
  })
  .catch((err) => console.log(`ERROR BAD CONNECTION ${err}`));
