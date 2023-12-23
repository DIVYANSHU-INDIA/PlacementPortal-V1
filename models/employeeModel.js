// Import the Mongoose library for MongoDB object modeling
const mongoose = require('mongoose');
// Import the bcrypt library for password hashing
const bcrypt = require('bcrypt');

// Define a schema for the 'Employee' collection
const employeeSchema = new mongoose.Schema(
  {
    // Define a field for the employee's name
    name: {
      type: String,
      required: true, // Name is a required field
    },
    // Define a field for the employee's email
    email: {
      type: String,
      unique: true, // Ensure uniqueness among employee emails
      required: true, // Email is a required field
    },
    // Define a field for the hashed password
    passwordHash: {
      type: String,
      required: true, // Password hash is a required field
    },
  },
  { timestamps: true } // Include timestamps for 'createdAt' and 'updatedAt'
);

// Create a virtual property to set the hashed password
employeeSchema.virtual('password').set(function (value) {
  // Use bcrypt to hash the provided password with a cost factor of 12
  this.passwordHash = bcrypt.hashSync(value, 12);
});

// Function to compare a hashed password
employeeSchema.methods.isPasswordCorrect = function (password) {
  // Use bcrypt to compare the provided password with the stored hashed password
  return bcrypt.compareSync(password, this.passwordHash);
};

// Create a Mongoose model named 'Employee' using the defined schema
const Employee = mongoose.model('Employee', employeeSchema);

// Export the 'Employee' model for use in other parts of the application
module.exports = Employee;
