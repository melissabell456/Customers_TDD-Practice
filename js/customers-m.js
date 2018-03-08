const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('acme.sqlite', (err) => {
  if (err) return console.log("unsuccessful", err);
  console.log('connection successful');
});

module.exports.getCustomers = () => {
  return new Promise( (resolve, reject) => {
    db.all(`SELECT * FROM customers`, function(err, data){
      if (err) return reject (err);
      resolve(data);
    });
  });
};

module.exports.getOneCustomer = ({ customer_id }) => {
  return new Promise( (resolve, reject) => {
    db.each(`SELECT * FROM customers WHERE customer_id = ${customer_id}`, function(err, data){
      if (err) return reject (err);
      resolve(data);
    });
  });
};


module.exports.addCustomer = ({ firstName, lastName, city, street, state, zip, phone }) => {
  return new Promise( (resolve, reject) => {
    db.run(`INSERT INTO customers VALUES (null, "${firstName}", "${lastName}", "${city}", "${street}", "${state}", "${zip}", "${phone}")`, function(err){
    if (err) return reject(err);
    resolve({ id: this.lastID });
    });
  });
};

module.exports.deleteCustomer = function({ customer_id, firstName, lastName, city, street, state, zip, phone }){
  return new Promise( (resolve, reject) => {
    db.run(`DELETE FROM customers WHERE customer_id = ${customer_id}`, function(err, row){
      if (err) return reject(err);
      console.log("resolves from delete", row);
      // resolve({ id: this.customer_id });
      resolve(true);
    });
  })
};