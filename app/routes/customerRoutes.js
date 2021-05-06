const express = require("express")

const customerController = require("../controllers/customerController")
const { createCustomer, getCustomers, getCustomerById, getCustomerByName }  = customerController;

const router = express.Router();

// customeres Routes

router.post('/customers', createCustomer);
router.get('/customers', getCustomers);
router.get('/customers/:customerId', getCustomerById);
router.get('/customer_by_name/:name', getCustomerByName);

module.exports = router;