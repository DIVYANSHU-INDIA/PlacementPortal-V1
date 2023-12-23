// Import the express library for building web applications
const express = require('express');
// Import the passport library for authentication
const passport = require('passport');
// Import the companyController module for handling company-related requests
const companyController = require('../controllers/companyNameController');
// Create an Express Router instance
const router = express.Router();

// -------- Get requests ----------

// Route for handling GET requests to '/company/home'
router.get(
  '/home',
  // Middleware to check if the user is authenticated using passport
  passport.checkAuthentication,
  // Handler function to render the company page
  companyController.companyPage
);

// Route for handling GET requests to '/company/allocate'
router.get(
  '/allocate',
  // Middleware to check if the user is authenticated using passport
  passport.checkAuthentication,
  // Handler function to render the allocate interview page
  companyController.allocateInterview
);

// -------- Post Requests ---------

// Route for handling POST requests to '/company/schedule-interview'
router.post(
  '/schedule-interview',
  // Middleware to check if the user is authenticated using passport
  passport.checkAuthentication,
  // Handler function to handle scheduling an interview
  companyController.scheduleInterview
);

// Route for handling POST requests to '/company/update-status/:id'
router.post(
  '/update-status/:id',
  // Middleware to check if the user is authenticated using passport
  passport.checkAuthentication,
  // Handler function to handle updating the interview status
  companyController.updateStatus
);

// Export the router for use in other parts of the application
module.exports = router;
