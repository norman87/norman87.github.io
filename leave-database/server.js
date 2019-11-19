//DEPENDENCIES
const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const session = require("express-session");

// Configuration
const PORT = process.env.PORT;
const mongoURI = process.env.MONGODB_URI;

// Middleware
// allows us to use put and delete methods
app.use(methodOverride("_method"));
// parses info from our input fields into an object
app.use(express.urlencoded({ extended: false }));
//using express-sessions middleware
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  })
);
// const controllers = require("./controllers/controllers.js");
// app.use("/", controllers);

const adminController = require("./controllers/admin.js");
app.use("/", adminController);

const userController = require("./controllers/user.js");
app.use("/", userController);

const sessionsController = require("./controllers/sessions.js");
app.use("/", sessionsController);

// Database
mongoose.connect(mongoURI, { useNewUrlParser: true });
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

// Listen
app.listen(PORT, () => console.log("listening on port", PORT));
