// src/config/database.js
const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
  // region: process.env.AWS_REGION || 'us-west-2',
  // accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  region: "local",
  endpoint: "http://localhost:8000",
  accessKeyId: "dummy",
  secretAccessKey: "dummy",
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "Customers";

module.exports = { dynamoDB, TABLE_NAME };
