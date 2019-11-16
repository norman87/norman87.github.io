const express = require("express");
const controllers = express.Router();
const Employee = require("../models/employees.js");

//routes
controllers.get("/admin/index", (req, res) => {
  res.render("./admin/index.ejs");
});

module.exports = controllers;
