import 'reflect-metadata';
import database from '@database/index';

database
  .then(() => {
    console.log('CONNETION DATABASE SUCCESS');
  })
  .catch((err) => console.log(`ERROR BAD CONNECTION ${err}`));
