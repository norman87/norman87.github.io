const express = require("express");
const user = express.Router();
const Employee = require("../models/employees.js");
const Leave = require("../models/leave.js");

//user - leave application form
user.get("/user/:id/new", (req, res) => {
  Employee.findById(req.params.id, (err, foundEmployee) => {
    res.render("./user/new.ejs", {
      employee: foundEmployee
    });
  });
});

//user - create leave application
user.post("/user/:id", (req, res) => {
  Leave.create(req.body, (err, createdLeave) => {
    if (err) {
      console.log(err);
    }
    console.log(createdLeave);
    res.redirect(`/user/${req.params.id}`);
  });
});

module.exports = user;
