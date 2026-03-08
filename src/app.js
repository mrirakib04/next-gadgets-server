// const errorHandler = require("./middlewares/error.middleware");
import express from "express";
import cors from "cors";
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

//routes

// text route
app.get("/", (req, res) => {
  res.send("My AIP is running like Rocket");
});

app.use(errorHandler);

module.exports = app;
