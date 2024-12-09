// src/routes/customerRoutes.js
const express = require("express");
const CustomerController = require("../controllers/customerController");
const router = express.Router();

router.post("/", CustomerController.createCustomer);
router.get("/", CustomerController.getAllCustomers);
router.get("/:id", CustomerController.getCustomerById);
router.put("/:id", CustomerController.updateCustomer);
router.delete("/:id", CustomerController.deleteCustomer);

module.exports = router;
