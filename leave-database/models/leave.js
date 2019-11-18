const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const leaveSchema = new Schema(
  {
    employeeId: { type: Schema.Types.ObjectID, ref: "Employee" },
    startDate: Date,
    endDate: Date,
    numberOfDays: Number
  },
  { timestamps: { createdAt: "created_at" } }
);

const Leave = mongoose.model("Leave", leaveSchema);

module.exports = Leave;
