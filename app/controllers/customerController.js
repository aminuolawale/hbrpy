const moment = require("moment")
const stats = require("../helpers/status")
const  dbQuery=  require("../db/dev/query");

const {errorMessage , status, successMessage}= stats;



const createCustomer = async (req, res) => {
  const { name } = req.body;
  try {
    const { rows } = await dbQuery.query(`select * from customer where name=$1`, [name]);
    const dbResponse = rows[0];
    successMessage.data = dbResponse;
    if (dbResponse !== undefined){
        errorMessage.error = `User with name ${name} already exists`;
    return res.status(status.error).send(errorMessage);
    }
  } catch (error) {
    errorMessage.error = "Operation was not successful";
    return res.status(status.error).send(errorMessage);
  }
  const dateCreated = moment(new Date());
  console.log("you!!")
  const createCustomerQuery = `INSERT INTO
        customer (name, dateCreated)
        VALUES($1, $2)
        returning *`;
  const values = [name, dateCreated];
    console.log(values)
  try {
    const { rows } = await dbQuery.query(createCustomerQuery, values);
    const dbResponse = rows[0];
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (error) {
      console.log(error)
    errorMessage.error = "Operation was not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const getCustomers = async (req, res) => {
  const getCustomersQuery = `select * from customer order by id desc`;

  try {
    const { rows } = await dbQuery.query(getCustomersQuery);
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
      errorMessage.error = "There are no buses";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = "An error Occured";
    return res.status(status.error).send(errorMessage);
  }
};

const getCustomerById = async (req, res) => {
  const { customerId } = req.params;
  const getCustomerQuery = `select * from customer where id=$1 order by id desc`;
  values = [customerId];
  try {
    const { rows } = await dbQuery.query(getCustomerQuery, values);
    const dbResponse = rows[0];
    if (dbResponse === undefined) {
      errorMessage.error = `There is no customer with id ${customerId}`;
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    console.log(error)

    errorMessage.error = "An error Occured";
    return res.status(status.error).send(errorMessage);
  }
};


const getCustomerByName = async (req, res) => {
    const { name } = req.params;
    const getCustomerQuery = `select * from customer where name=$1 order by id desc`;
    values = [name];
    try {
      const { rows } = await dbQuery.query(getCustomerQuery, values);
      const dbResponse = rows[0];
      if (dbResponse === undefined) {
        errorMessage.error = `There is no customer with name ${name}`;
        return res.status(status.notfound).send(errorMessage);
      }
      successMessage.data = dbResponse;
      return res.status(status.success).send(successMessage);
    } catch (error) {
        console.log(error)
      errorMessage.error = "An error Occured";
      return res.status(status.error).send(errorMessage);
    }
  };
  

  module.exports = { createCustomer, getCustomers, getCustomerById, getCustomerByName }
  
  