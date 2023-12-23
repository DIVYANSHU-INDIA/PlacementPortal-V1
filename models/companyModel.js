// Import the Mongoose library
const mongoose = require('mongoose');

// Define a schema for the 'Company' collection
const companySchema = new mongoose.Schema(
  {
    // Define a field for the company name
    name: {
      type: String,
      unique: true, // Ensure uniqueness among company names
    },
    // Define a field for the list of students associated with the company
    students: [
      {
        // Each element in the 'students' array contains the following fields
        student: {
          // A reference to the 'Student' model using its ObjectId
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Student', // Reference the 'Student' model
        },
        date: {
          // Date of the interaction with the student
          type: Date,
          required: true, // Date is a required field
        },
        result: {
          // Result of the interaction with the student
          type: String,
          // Enumerated values to restrict possible result values
          enum: [
            'On Hold',
            'Selected',
            'Pending',
            'Not Selected',
            'Did not Attempt',
          ],
        },
      },
    ],
  },
  { timestamps: true } // Include timestamps for 'createdAt' and 'updatedAt'
);

// Create a Mongoose model named 'Company' using the defined schema
const Company = mongoose.model('Company', companySchema);

// Export the 'Company' model for use in other parts of the application
module.exports = Company;
