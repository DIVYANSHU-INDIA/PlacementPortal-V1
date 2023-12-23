// Import the express library for building web applications
const express = require('express');

// Create an Express Router instance
const router = express.Router();

// Import additional routers and controllers
const employeeRoute = require('./employeeRouter'); // Import the employee router
const studentRoute = require('./studentDetailRouter'); // Import the student router
const homeController = require('../controllers/homeAccessController'); // Import the home controller
const companyRoute = require('./companyRouter'); // Import the company router
const passport = require('passport'); // Import the Passport library for authentication

// Route for handling GET requests to the home page '/'
router.get('/', 
  // Passport middleware to check if the user is authenticated
  passport.checkAuthentication, 
  // Controller function to handle rendering the home page
  homeController.homePage
);

// Use the employeeRoute for paths starting with '/employee'
router.use('/employee', employeeRoute);

// Use the studentRoute for paths starting with '/students'
router.use('/students', studentRoute);

// Use the companyRoute for paths starting with '/company'
router.use('/company', companyRoute);

// Use the searchJobPortalRouter for paths starting with '/search-job'
router.use('/search-job', require('./searchJobPortalRouter'));

// Export the router for use in other parts of the application
module.exports = router;
