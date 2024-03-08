const mongoose = require("mongoose");

// Define a schema for the user
const EmployeeSchema = new mongoose.Schema({
   firstName: String,
   lastName: String,
   email: String,
   password: String,
 });
 
 
// Define a model for the user
const EmployeeModel = mongoose.model("User", EmployeeSchema);
module.exports = EmployeeModel