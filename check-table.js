const AWS = require("aws-sdk");
AWS.config.update({
  region: "local",
  endpoint: "http://localhost:8000",
  accessKeyId: "dummy",
  secretAccessKey: "dummy",
}); // Update with your preferred region

const dynamodb = new AWS.DynamoDB();

// Add this to your create-table.js file or create a new check-table.js
async function listTables() {
  try {
    const result = await dynamodb.listTables().promise();
    console.log("Available tables:", result.TableNames);
  } catch (error) {
    console.error("Error listing tables:", error);
  }
}

listTables();
