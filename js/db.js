const sqlite3 = require('sqlite3').verbose();
const { createTables } = require('./makeTable');

(function createDb() {
  new sqlite3.Database('acme.sqlite', () => { 
  createTables()
  .then( (data) => {
    console.log(data);
  })
  .catch( (err) => {
    console.log('opps', err);
  });
  });
}());