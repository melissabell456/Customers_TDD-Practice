const { assert: {equal, isFunction, isObject, isArray, isTrue } } = require('chai');
const { createTables } = require('../js/makeTable');
const { getCustomers, addCustomer, deleteCustomer, getOneCustomer } = require('../js/customers-m');

describe('make table', () => {
  it('should be a function', () => {
    isFunction(createTables);
  });
});

describe('customers module', () => {

// get ALL customers
  describe('getCustomers()', () => {
    it('should be a function', () => {
      isFunction(getCustomers);
    });
    it('should return an array of objects', () => {
      return getCustomers()
      .then( (data) => {
        isArray(data, "returns an array");
        isObject(data[0], "array does not contain objects");
      })
    });
  });

// GET ONE CUSTOMER
  describe('getOneCustomer()', () => {
    let customer = {
      customer_id: 7,
    };
    it('should return one object', () => {
      getOneCustomer(customer)
      .then( (data) => {
        isObject(data);
      });
    });
  });

// ADDING CUSTOMERS
  describe('addCustomer()', () => {
    let newCust = {
      firstName: "Pat",
      lastName: "Smith",
      city: "Nashville",
      state: "TN",
      zip: "37027",
      phone: "111-111-1111"
    };
    beforeEach( (done) => {
      createTables()
      .then( () => {
        done();
      })
    })
    it('should return an object', () => {
      return addCustomer(newCust)
      .then( (data) => {
        isObject(data);
      });
    });
    it('should add a new item to the db', () => {
      return addCustomer(newCust)
      .then( ({ id } ) => {
        equal(9, id);
      })
    });
  });

// DELETING CUSTOMERS
  describe('deleteCustomer()', () => {
    let customer = {
      customer_id: 8, 
      firstName: 'Ben', 
      lastName: 'Gentle', 
      city: 'Cedar Rapids', 
      street: '1 The Woods', 
      state: 'Iowa', 
      zip: '12345', 
      phone: '123-555-5309' 
    }
    afterEach( (done) => {
      createTables()
      .then( () => {
        done();
      })
    })
    it('should return an object', () => {
      return deleteCustomer(customer)
      .then( (data) => {
        isTrue(data);
      })
    });
    it('should confirm deletion by resolving with the deleted users ID', () => {
      return deleteCustomer(customer)
      .then( (data) => {
        isTrue(data);
      });
    });
  });
});