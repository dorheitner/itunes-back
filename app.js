const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Contect To Mongo Database
const mongoConnect = require("./helpers/database").mongoConnect;

// Handle Requests
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Import Routes
const SearchRequests = require("./routes/searchRequests");
const Itunes = require("./routes/intunes");

app.use(bodyParser.json());

// Use Routes
app.use("/requests", SearchRequests);
app.use("/itunes", Itunes);

// Handle Errors
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoConnect(() => {
  app.listen(3001);
});
