// src/controllers/customerController.js
const CustomerModel = require("../models/customerModel");

class CustomerController {
  static async createCustomer(req, res, next) {
    try {
      const customer = await CustomerModel.create(req.body);
      res.status(201).json(customer);
    } catch (error) {
      next(error);
    }
  }

  static async getAllCustomers(req, res, next) {
    try {
      const customers = await CustomerModel.findAll();
      res.json(customers);
    } catch (error) {
      next(error);
    }
  }

  static async getCustomerById(req, res, next) {
    try {
      const customer = await CustomerModel.findById(req.params.id);
      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }

  static async updateCustomer(req, res, next) {
    try {
      const customer = await CustomerModel.update(req.params.id, req.body);
      console.log("Updating customer ", customer);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }

  static async deleteCustomer(req, res, next) {
    try {
      await CustomerModel.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CustomerController;
