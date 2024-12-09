// src/models/customerModel.js
const { dynamoDB, TABLE_NAME } = require("../config/database");
const uuid = require("uuid");

class CustomerModel {
  static async create(customerData) {
    const customer = {
      id: uuid.v4(),
      ...customerData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await dynamoDB
      .put({
        TableName: TABLE_NAME,
        Item: customer,
      })
      .promise();

    return customer;
  }

  static async findAll() {
    const result = await dynamoDB
      .scan({
        TableName: TABLE_NAME,
      })
      .promise();
    return result.Items;
  }

  static async findById(id) {
    const result = await dynamoDB
      .get({
        TableName: TABLE_NAME,
        Key: { id },
      })
      .promise();
    return result.Item;
  }

  static async update(id, updates) {
    // Remove id from updates if it exists
    const { id: _, ...updateFields } = updates;

    // Create a copy of updates and add updatedAt
    const updatesWithTimestamp = {
      ...updateFields,
      updatedAt: new Date().toISOString(),
    };

    // Create update expression and attribute values
    const updateExpression =
      "set " +
      Object.keys(updatesWithTimestamp)
        .map((key) => `${key} = :${key}`)
        .join(", ");

    const expressionAttributeValues = Object.entries(
      updatesWithTimestamp
    ).reduce((acc, [key, value]) => {
      acc[`:${key}`] = value;
      return acc;
    }, {});

    const params = {
      TableName: TABLE_NAME,
      Key: { id },
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "ALL_NEW",
    };

    const result = await dynamoDB.update(params).promise();
    return result.Attributes;
  }

  static async delete(id) {
    await dynamoDB
      .delete({
        TableName: TABLE_NAME,
        Key: { id },
      })
      .promise();
  }
}

module.exports = CustomerModel;
