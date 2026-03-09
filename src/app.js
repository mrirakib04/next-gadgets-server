const errorHandler = require("./middlewares/error.middleware");
const express = require("express");
const cors = require("cors");
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

//routes

// text route
app.get("/", (req, res) => {
  res.send("My API is running.");
});

app.use(errorHandler);

module.exports = app;
