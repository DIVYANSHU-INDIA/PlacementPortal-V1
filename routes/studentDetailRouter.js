// Import the express library for building web applications
const express = require('express');
// Import the passport library for authentication
const passport = require('passport');

// Create an Express Router instance
const router = express.Router();

// Import the studentController module for handling student-related requests
const studentController = require('../controllers/studentDetailsController');

// ------------------ Get requests ------------

// Route for handling GET requests to '/students/create'
router.get(
  '/create',
  // Passport middleware to check if the user is authenticated
  passport.checkAuthentication,
  // Controller function to render the create student page
  studentController.createStudentPage
);

// Route for handling GET requests to '/students/delete/:id'
router.get(
  '/delete/:id',
  // Passport middleware to check if the user is authenticated
  passport.checkAuthentication,
  // Controller function to delete a student
  studentController.deleteStudent
);

// ------------------- Posts Requests ----------

// Route for handling POST requests to '/students/create-student'
router.post(
  '/create-student',
  // Passport middleware to check if the user is authenticated
  passport.checkAuthentication,
  // Controller function to create a new student
  studentController.createStudent
);

// Export the router for use in other parts of the application
module.exports = router;
