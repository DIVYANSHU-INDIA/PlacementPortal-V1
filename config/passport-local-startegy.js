// Import necessary modules
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Import the Employee model
const Employee = require('../models/employeeModel');

// Define a local strategy for authentication
const local = new LocalStrategy({ usernameField: 'email' }, function (
  email,
  password,
  done
) {
  // Find the user with the provided email in the database
  Employee.findOne({ email }, function (error, user) {
    if (error) {
      console.log(`Error in finding user: ${error}`);
      return done(error);
    }

    // Check if user exists and the password is correct
    if (!user || !user.isPasswordCorrect(password)) {
      console.log('Invalid Username/Password');
      return done(null, false);
    }

    // If the user is found and the password is correct, return the user
    return done(null, user);
  });
});

// Use the local strategy in Passport
passport.use('local', local);

// Serialize user to store user id in the session
passport.serializeUser(function (employee, done) {
  done(null, employee.id);
});

// Deserialize user to retrieve the user by id from the database
passport.deserializeUser(function (id, done) {
  Employee.findById(id, function (err, user) {
    if (err) {
      console.log('Error in finding user--> Passport');
      return done(err);
    }
    return done(null, user);
  });
});

// Middleware to check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/employee/signin');
};

// Middleware to set authenticated user for views
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

// Export the configured passport for use in other parts of the application
module.exports = passport;
