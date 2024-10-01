const path = require("path");
require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
// const compression = require('compression')

const dbConnection = require("./config/databae");
const amountRoutes = require("./routes");
const httpStatus = require("./config/httpStatus");
const globalError = require("./middleware/globalErrorMiddleware");
const AppError = require("./utils/appError");

dbConnection();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../uploads")));
// app.use(compression())

// Set middleware in development mode
if (process.env.ENVIRONMENT_MODE === "development") {
  app.use(morgan("dev"));
  console.log(`Environment Mode: ${process.env.ENVIRONMENT_MODE}`);
}

// Server run
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

amountRoutes(app);

// Handel not found Route
app.use("*", (req) => {
  throw new AppError(
    404,
    httpStatus.FAIL,
    `Not Found Route ${req.originalUrl}`
  );
});

// Global Error Handler
app.use(globalError);

// Handle unhandled promise rejections
process.on("unhandledRejection", (error) => {
  console.error(`Unhandled Rejection: ${error.name} | ${error.stack}`);
  server.close(() => {
    console.log("Server shutting down...");
    process.exit(1);
  });
});
