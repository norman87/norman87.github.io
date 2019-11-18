const express = require("express");
const controllers = express.Router();
const Employee = require("../models/employees.js");
const Leave = require("../models/leave.js");

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

//admin - delete employee data
controllers.delete("/admin/:id", (req, res) => {
  Employee.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect("/admin");
  });
});

//user - dashboard
controllers.get("/user/:id", (req, res) => {
  Leave.find({ applicantID: req.params.id }, (err, foundLeave) => {
    res.render("./user/index.ejs", {
      leave: foundLeave,
      employeeId: req.params.id
    });
  });
});

//user - leave application form
controllers.get("/user/:id/new", (req, res) => {
  Employee.findById(req.params.id, (err, foundEmployee) => {
    res.render("./user/new.ejs", {
      employee: foundEmployee
    });
  });
});

//user - create leave application
controllers.post("/user/:id", (req, res) => {
  Leave.create(req.body, (err, createdLeave) => {
    if (err) {
      console.log(err);
    }
    console.log(createdLeave);
    res.redirect(`/user/${req.params.id}`);
  });
});

module.exports = controllers;