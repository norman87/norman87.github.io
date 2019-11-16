const express = require("express");
const controllers = express.Router();
const Employee = require("../models/employees.js");

//routes
//admin - dashboard
controllers.get("/admin", (req, res) => {
  Employee.find({}, (err, allEmployees) => {
    res.render("./admin/index.ejs", {
      employees: allEmployees
    });
  });
});

//admin - add new employee form
controllers.get("/admin/new", (req, res) => {
  res.render("./admin/new.ejs");
});

//admin - show employee
controllers.get("/admin/:id", (req, res) => {
  Employee.findById(req.params.id, (err, foundEmployee) => {
    res.render("./admin/show.ejs", {
      employee: foundEmployee
    });
  });
});

//admin - add new employee
controllers.post("/admin", (req, res) => {
  Employee.create(req.body, (err, createdUser) => {
    if (err) {
      console.log(err);
    }
    console.log(createdUser);
    res.redirect("/admin");
  });
});

//admin - edit employee's particulars form
controllers.get("/admin/:id/edit", (req, res) => {
  Employee.findById(req.params.id, (err, foundEmployee) => {
    res.render("./admin/edit.ejs", {
      employee: foundEmployee
    });
  });
});

//admin - update employee's particulars
controllers.put("/admin/:id", (req, res) => {
  Employee.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedModel) => {
      res.redirect("/admin");
    }
  );
});

module.exports = controllers;
