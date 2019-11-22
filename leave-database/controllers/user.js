const express = require("express");
const user = express.Router();
const Employee = require("../models/employees.js");
const Leave = require("../models/leave.js");

//user - leave application form
user.get("/user/:id/new", (req, res) => {
  if (req.session.currentUser) {
    Employee.findById(req.params.id, (err, foundEmployee) => {
      res.render("./user/new.ejs", {
        employee: foundEmployee
      });
    });
  } else {
    res.redirect("/sessions/new");
  }
});

//user - user dashboard
user.get("/user/:id", (req, res) => {
  // console.log("current user");
  // console.log("HEREEEEEEEEEEEEEEQWEQWEE", req.session.currentUser);
  if (req.session.currentUser) {
    Employee.findById(req.params.id, (err, foundEmployee) => {
      Leave.find({ employeeId: req.params.id })
        .populate("employeeId")
        .exec(function(err, foundLeave) {
          if (err) return handleError(err);
          //leave aggregate function not working, calculation done on browser
          Leave.aggregate(
            [
              {
                $match: {
                  approvalStatus: "Approved",
                  employeeId: req.params.id
                }
              },
              {
                $group: {
                  numberOfDays: { $sum: "$numberOfDays" }
                }
              }
            ],
            (groupErr, leaveTaken) => {
              console.log("LEAVEEEEEEEEEEE", leaveTaken);
              res.render("./user/index.ejs", {
                employee: foundEmployee,
                leave: foundLeave,
                leaveTaken: leaveTaken
              });
              console.log(foundEmployee);
              console.log(foundLeave.length);
            }
          );
        });
    });
  } else {
    res.redirect("/sessions/new");
  }
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
