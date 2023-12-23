// Import the Mongoose library for MongoDB object modeling
const mongoose = require('mongoose');

// Define a schema for the 'Student' collection
const studentSchema = new mongoose.Schema(
  {
    // Define a field for the student's name
    name: {
      type: String,
      required: true, // Name is a required field
    },
    // Define a field for the student's email
    email: {
      type: String,
      unique: true, // Ensure uniqueness among student emails
      required: true, // Email is a required field
    },
    // Define a field for the student's college
    college: {
      type: String,
      required: true, // College is a required field
    },
    // Define a field for the student's placement status with enum values
    placement: {
      type: String,
      required: true,
      enum: ['Placed', 'Not Placed'], // Placement status must be one of the enum values
    },
    // Define a field for the student's contact number
    contactNumber: {
      type: Number,
      required: true, // Contact number is a required field
    },
    // Define a field for the student's batch
    batch: {
      type: String,
      required: true, // Batch is a required field
    },
    // Define a field for the student's DSA score
    dsa: {
      type: Number,
      required: true, // DSA score is a required field
    },
    // Define a field for the student's WebDev score
    webd: {
      type: Number,
      required: true, // WebDev score is a required field
    },
    // Define a field for the student's React score
    react: {
      type: Number,
      required: true, // React score is a required field
    },
    // Define an array field for the student's interview history with each company
    interviews: [
      {
        // Each element in the 'interviews' array contains the following fields
        company: {
          type: String,
        },
        date: {
          type: String,
        },
        result: {
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

// Create a Mongoose model named 'Student' using the defined schema
const Student = mongoose.model('Student', studentSchema);

// Export the 'Student' model for use in other parts of the application
module.exports = Student;
