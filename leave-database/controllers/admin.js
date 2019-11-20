const express = require("express");
const admin = express.Router();
const Employee = require("../models/employees.js");
const Leave = require("../models/leave.js");
const bcrypt = require("bcrypt");

//routes
//admin - dashboard
admin.get("/admin", (req, res) => {
  if (req.session.currentUser) {
    Employee.find({}, (err, allEmployees) => {
      Leave.find()
        .populate("employeeId")
        .exec(function(err, foundLeave) {
          if (err) return handleError(err);
          // console.log(foundLeave);
          res.render("./admin/index.ejs", {
            employees: allEmployees,
            leave: foundLeave
          });
        });
    });
  } else {
    res.redirect("/sessions/new");
  }
});

//admin - add new employee form
admin.get("/admin/new", (req, res) => {
  if (req.session.currentUser) {
    res.render("./admin/new.ejs");
  } else {
    res.redirect("/sessions/new");
  }
});

//admin - show employee
admin.get("/admin/:id", (req, res) => {
  if (req.session.currentUser) {
    Employee.findById(req.params.id, (err, foundEmployee) => {
      res.render("./admin/show.ejs", {
        employee: foundEmployee
      });
    });
  } else {
    res.redirect("/sessions/new");
  }
});

//admin - add new employee
admin.post("/admin", (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
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
  if (req.session.currentUser) {
    Employee.findById(req.params.id, (err, foundEmployee) => {
      res.render("./admin/edit.ejs", {
        employee: foundEmployee
      });
    });
  } else {
    res.redirect("/sessions/new");
  }
});

//admin - update employee's particulars
admin.put("/admin/:id", (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
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
