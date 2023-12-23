// Import the express library for building web applications
const express = require('express');
// Import the passport library for authentication
const passport = require('passport');
// Create an Express Router instance
const router = express.Router();
// Import the employeeController module for handling employee-related requests
const employeeController = require('../controllers/employeeDetailsController');

// ------------------------- Get Requests -----------------------

// Route for handling GET requests to '/employee/signup'
router.get('/signup', employeeController.signup);

// Route for handling GET requests to '/employee/signin'
router.get('/signin', employeeController.signin);

// Route for handling GET requests to '/employee/signout'
router.get('/signout',
  // Middleware to check if the user is authenticated using passport
  passport.checkAuthentication,
  // Handler function to sign out the user
  employeeController.signout
);

// Route for handling GET requests to '/employee/download-csv'
router.get(
  '/download-csv',
  // Middleware to check if the user is authenticated using passport
  passport.checkAuthentication,
  // Handler function to download CSV file
  employeeController.downloadCsv
);

// ------------------------- Post Request -----------------------

// Route for handling POST requests to '/employee/create'
router.post('/create', employeeController.createEmployee);

// Route for handling POST requests to '/employee/create-session'
router.post(
  '/create-session',
  // Passport middleware for authenticating using the 'local' strategy
  passport.authenticate('local', { failureRedirect: '/employee/signin' }),
  // Handler function to create a user session after successful authentication
  employeeController.createSession
);

// Export the router for use in other parts of the application
module.exports = router;
