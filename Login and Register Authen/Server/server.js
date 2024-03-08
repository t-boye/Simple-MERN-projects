const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const EmployeeModel = require("./models/Employee");

// Create an Express app instance
const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// Enable CORS (adjust origins if needed)
app.use(cors({ origin: "http://localhost:5173" })); // Replace with your front-end origin if different

// Connect to your MongoDB database (replace with your connection details)
mongoose.connect("mongodb://localhost:27017/myDatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection; // Get the connection object

// Handle connection errors
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB database!");
});



// Define the '/register' endpoint
app.post("/register", async (req, res) => {
   try {
     const { firstName, lastName, email, password } = req.body;
 
     // Check if the user already exists in the database
     const existingUser = await EmployeeModel.findOne({ email });
     if (existingUser) {
       return res.status(400).json({ message: "User already exists" });
     }
 
     // Create a new user object
     const newUser = new EmployeeModel({ firstName, lastName, email, password });
 
     // Save the user to the database
     await newUser.save();
 
     // Respond with a success message
     res.status(200).json({ message: "Registration successful" });
   } catch (error) {
     console.error("Error:", error);
     res.status(500).json({ message: "Internal server error" });
   }
 });
 
// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});