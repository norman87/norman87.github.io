//DEPENDENCIES
const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

// Configuration
const PORT = process.env.PORT;
const mongoURI = process.env.MONGODB_URI;

// Middleware
// allows us to use put and delete methods
app.use(methodOverride("_method"));
// parses info from our input fields into an object
app.use(express.urlencoded({ extended: false }));

// const controllers = require("./controllers/controllers.js");
// app.use("/", controllers);

const admin = require("./controllers/admin.js");
app.use("/", admin);

const user = require("./controllers/user.js");
app.use("/", user);

// Database
mongoose.connect(mongoURI, { useNewUrlParser: true });
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

// Listen
app.listen(PORT, () => console.log("listening on port", PORT));
