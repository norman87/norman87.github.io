const express = require("express");
const admin = express.Router();
const Employee = require("../models/employees.js");
const Leave = require("../models/leave.js");

//routes
//admin - dashboard
admin.get("/admin", (req, res) => {
  Employee.find({}, (err, allEmployees) => {
    res.render("./admin/index.ejs", {
      employees: allEmployees
    });
  });
});

//admin - add new employee form
admin.get("/admin/new", (req, res) => {
  res.render("./admin/new.ejs");
});

//admin - show employee
admin.get("/admin/:id", (req, res) => {
  Employee.findById(req.params.id, (err, foundEmployee) => {
    res.render("./admin/show.ejs", {
      employee: foundEmployee
    });
  });
});

//admin - add new employee
admin.post("/admin", (req, res) => {
  Employee.create(req.body, (err, createdUser) => {
    if (err) {
      console.log(err);
    }
    console.log(createdUser);
    res.redirect("/admin");
  });
});

//admin - edit employee's particulars form
admin.get("/admin/:id/edit", (req, res) => {
  Employee.findById(req.params.id, (err, foundEmployee) => {
    res.render("./admin/edit.ejs", {
      employee: foundEmployee
    });
  });
});

//admin - update employee's particulars
admin.put("/admin/:id", (req, res) => {
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
admin.delete("/admin/:id", (req, res) => {
  Employee.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect("/admin");
  });
});

module.exports = admin;
