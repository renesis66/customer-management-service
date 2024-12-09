// src/app.js
const express = require("express");
const bodyParser = require("body-parser");
const customerRoutes = require("./routes/customerRoutes");
const errorHandler = require("./middleware/error");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

app.use(cors());

// Routes
app.use("/api/customers", customerRoutes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
