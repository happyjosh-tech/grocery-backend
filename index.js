/**
 * Requiring Mongoose and setting up app listen here as to not interfere with
 * tests
 */
const mongoose = require("mongoose");

const app = require("./app");
const keys = require("./config/keys.js");

const PORT = process.env.PORT || 5000;

mongoose
  .connect(keys.mongodb.dbUrl, { useNewUrlParser: true })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running: http://localhost:${PORT}/`)
    );
  })
  .catch(error => console.error(error.message));
