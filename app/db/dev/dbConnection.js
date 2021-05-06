const pool = require("./pool")

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create Customer Table
 */
const createCustomerTable = () => {
  const customerCreateQuery = `CREATE TABLE IF NOT EXISTS customer
  (id SERIAL PRIMARY KEY, 
  name VARCHAR(100), 
  dateCreated DATE NOT NULL)`;

  pool.query(customerCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Create Store Table
 */
const createStoreTable = () => {
  const storeCreateQuery = `CREATE TABLE IF NOT EXISTS store
    (id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    dateCreated DATE NOT NULL)`;

  pool.query(storeCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Create Bill Table
 */
const createBillTable = () => {
  const billCreateQuery = `CREATE TABLE IF NOT EXISTS bill
    (id SERIAL PRIMARY KEY, 
    customer_id INTEGER REFERENCES customer(id),
    store_id INTEGER REFERENCES store(id),
    amount FLOAT NOT NULL,
    product_type VARCHAR(300) NOT NULL,
    status VARCHAR(10) NOT NULL,
    dateCreated DATE NOT NULL)`;

  pool.query(billCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Create Discount Table
 */
const createDiscountTable = () => {
  const discountCreateQuery = `CREATE TABLE IF NOT EXISTS discount
  (id SERIAL PRIMARY KEY, 
    discount_type VARCHAR(100) NOT NULL,
    value FLOAT NOT NULL,
    base_value FLOAT NOT NULL,
    dateCreated DATE NOT NULL)`;
  pool.query(discountCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Create Relationship Table
 */
const createRelationshipTable = () => {
  const discountCreateQuery = `CREATE TABLE IF NOT EXISTS relationship
  (id SERIAL PRIMARY KEY, 
    customer_id INTEGER REFERENCES customer(id),
    store_id INTEGER REFERENCES store(id),
    type VARCHAR(20) NOT NULL,
    dateCreated DATE NOT NULL)`;
  pool.query(relationshipCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop Customer Table
 */
const dropCustomerTable = () => {
  const customerDropQuery = 'DROP TABLE IF EXISTS customer';
  pool.query(customerDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


/**
 * Drop Store Table
 */
const dropStoreTable = () => {
  const storeDropQuery = 'DROP TABLE IF EXISTS store';
  pool.query(storeDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop Bill Table
 */
const dropBillTable = () => {
  const billDropQuery = 'DROP TABLE IF EXISTS bill';
  pool.query(billDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop Store Table
 */
const dropDiscountTable = () => {
  const discountDropQuery = 'DROP TABLE IF EXISTS discount';
  pool.query(discountDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropRelationshipTable = () => {
  const relationshipDropQuery = 'DROP TABLE IF EXISTS relationship';
  pool.query(relationshipDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


/**
 * Create All Tables
 */
const createAllTables = () => {
  createCustomerTable();
  createStoreTable();
  createBillTable();
  createDiscountTable();
  createRelationshipTable();
};


/**
 * Drop All Tables
 */
const dropAllTables = () => {
  dropCustomerTable();
  dropStoreTable();
  dropBillTable();
  dropDiscountTable();
  dropRelationshipTable();
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});


module.exports= {
  createAllTables,
  dropAllTables,
};

require('make-runnable');