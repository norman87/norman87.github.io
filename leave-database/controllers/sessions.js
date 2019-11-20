const express = require("express");
const sessions = express.Router();
const Employee = require("../models/employees.js");
const Leave = require("../models/leave.js");
const bcrypt = require("bcrypt");

sessions.get("/sessions/new", (req, res) => {
  res.render("./sessions/new.ejs");
});

sessions.post("/sessions", (req, res) => {
  Employee.findOne({ username: req.body.username }, (err, foundUser) => {
    // if db error handle the db error
    if (err) {
      console.log(err);
      res.send("oops something went wrong");
      // if user not found, handle the error
    } else if (!foundUser) {
      res.send("user not found!");
    } else {
      if (
        bcrypt.compareSync(req.body.password, foundUser.password) &&
        foundUser.isAdmin === false
      ) {
        req.session.currentUser = foundUser;
        res.redirect(`/user/${foundUser._id}`);
        // if passwords don't match, handle the error
      } else if (
        bcrypt.compareSync(req.body.password, foundUser.password) &&
        foundUser.isAdmin === true
      ) {
        req.session.currentUser = foundUser;
        res.redirect("/admin");
      } else {
        res.send('<a href="/sessions/new">wrong password</a>');
      }
    }
  });
});

sessions.delete("/sessions", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/sessions/new");
  });
});
module.exports = sessions;
