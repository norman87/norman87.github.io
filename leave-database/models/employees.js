const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateEmployed: Date,
  dateOfBirth: Date,
  gender: String,
  nationality: String,
  leaveBalance: Number,
  username: String,
  password: String,
  isAdmin: Boolean
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
