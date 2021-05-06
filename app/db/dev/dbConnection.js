const pool = require("./pool");
const moment = require("moment");
const  dbQuery=  require("./query");

pool.on("connect", () => {
  console.log("connected to the db");
});

/**
 * Create Customer Table
 */
const createCustomerTable = () => {
  const customerCreateQuery = `CREATE TABLE IF NOT EXISTS customer
  (id SERIAL PRIMARY KEY, 
  name VARCHAR(100) UNIQUE, 
  dateCreated DATE NOT NULL)`;

  pool
    .query(customerCreateQuery)
    .then((res) => {
     // console.log(res);
      
    })
    .catch((err) => {
     // console.log(err);
      
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

  pool
    .query(storeCreateQuery)
    .then((res) => {
     // console.log(res);
      
    })
    .catch((err) => {
     // console.log(err);
      
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

  pool
    .query(billCreateQuery)
    .then((res) => {
     // console.log(res);
      
    })
    .catch((err) => {
     // console.log(err);
      
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
  pool
    .query(discountCreateQuery)
    .then((res) => {
     // console.log(res);
      
    })
    .catch((err) => {
     // console.log(err);
      
    });
};

/**
 * Create Relationship Table
 */
const createRelationshipTable = () => {
  const relationshipCreateQuery = `CREATE TABLE IF NOT EXISTS relationship
  (id SERIAL PRIMARY KEY, 
    customer_id INTEGER REFERENCES customer(id),
    store_id INTEGER REFERENCES store(id),
    type VARCHAR(20) NOT NULL,
    dateCreated DATE NOT NULL)`;
  pool
    .query(relationshipCreateQuery)
    .then((res) => {
     // console.log(res);
      
    })
    .catch((err) => {
     // console.log(err);
      
    });
};

/**
 * Drop Customer Table
 */
const dropCustomerTable = () => {
  const customerDropQuery = "DROP TABLE IF EXISTS customer";
  pool
    .query(customerDropQuery)
    .then((res) => {
     // console.log(res);
      
    })
    .catch((err) => {
     // console.log(err);
      
    });
};

/**
 * Drop Store Table
 */
const dropStoreTable = () => {
  const storeDropQuery = "DROP TABLE IF EXISTS store";
  pool
    .query(storeDropQuery)
    .then((res) => {
     // console.log(res);
      
    })
    .catch((err) => {
     // console.log(err);
      
    });
};

/**
 * Drop Bill Table
 */
const dropBillTable = () => {
  const billDropQuery = "DROP TABLE IF EXISTS bill";
  pool
    .query(billDropQuery)
    .then((res) => {
     // console.log(res);
      
    })
    .catch((err) => {
     // console.log(err);
      
    });
};

/**
 * Drop Store Table
 */
const dropDiscountTable = () => {
  const discountDropQuery = "DROP TABLE IF EXISTS discount";
  pool
    .query(discountDropQuery)
    .then((res) => {
     // console.log(res);
      
    })
    .catch((err) => {
     // console.log(err);
      
    });
};

const dropRelationshipTable = () => {
  const relationshipDropQuery = "DROP TABLE IF EXISTS relationship";
  pool
    .query(relationshipDropQuery)
    .then((res) => {
     // console.log(res);
      
    })
    .catch((err) => {
     // console.log(err);
      
    });
};

const populateCustomerTable = () => {
  const data = ["Bootes Void", "Eta Carinae", "Wolf Rayet", "RR Lyrae"];
  for (let i = 0; i < data.length; i++) {
    d = data[i];
    const dateCreated = new Date();
    dateCreated.setYear(dateCreated.getFullYear()-i)
    console.log(d, dateCreated);
    const query = `INSERT INTO
    customer (name, dateCreated)
    VALUES($1, $2)
    returning *`;
    pool
      .query(query, [d, dateCreated])
      .then((res) => {
       // console.log(res);
        
      })
      .catch((err) => {
       // console.log(err);
        
      });
  }
};

const populateStoreTable = () => {
  const data = ["Pure n Kleen", "MCRN", "Tycho", "BeyondMart"];
  for (let i = 0; i < data.length; i++) {
    d = data[i];
    const dateCreated = moment(new Date());
    const query = `INSERT INTO
    store (name, dateCreated)
    VALUES($1, $2)
    returning *`;
    pool
      .query(query, [d, dateCreated])
      .then((res) => {
       // console.log(res);
        
      })
      .catch((err) => {
       // console.log(err);
        
      });
  }
};

const populateBillTable = async () => {
  const data = ["groceries", "meat", "appliances", "clothes"];
  const {users} = await dbQuery.query(`select id,  dateCreated from customer`)
  const {stores} = await dbQuery.query(`select id,  dateCreated from store`)

  for (let i = 0; i < data.length; i++) {
    d = data[i];
    console.log(d, dateCreated);
    const query = `INSERT INTO
    customer (customer_id, store_id, amount, product_type, dateCreated)
    VALUES($1, $2, $3, $4, $5)
    returning *`;
    const  us = users[Math.floor(Math.random() * users.length)];
    const  st = stores[Math.floor(Math.random() * stores.length)];

    pool
      .query(query, [us.id, st.id, 2.90 * i, d,  us.dateCreated])
      .then((res) => {
       // console.log(res);
        
      })
      .catch((err) => {
       // console.log(err);
        
      });
  }
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
  populateCustomerTable();
  populateStoreTable();
  populateBillTable();
  // populateDiscountTable();
  // populateRelationshipTable();
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

pool.on("remove", () => {
  console.log("client removed");
  process.exit(0);
});

module.exports = {
  createAllTables,
  dropAllTables,
};

require("make-runnable");
