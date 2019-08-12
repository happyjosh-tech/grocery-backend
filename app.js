const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mealsRouter = require("./routes/meals");
const groceriesRouter = require("./routes/groceries");

const app = express();
// Allow use of env vars in .env file
require("dotenv/config");

//Middlwares
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//disable caching
app.disable("etag");

//Routes
app.get("/");
app.use("/api", mealsRouter);
app.use("/api", groceriesRouter);

/**
 * exporting app
 */
module.exports = app;
