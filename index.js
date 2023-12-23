// Required modules and configurations
const express = require('express');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-startegy');
const port = 8000;

const expressLayouts = require('express-ejs-layouts');
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Serve static files from the 'assets' and 'images' directories
app.use(express.static('./assets'));
app.use(express.static('./images'));

// Session middleware configuration
app.use(
  session({
    secret: 'blahsomething',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 100 },
  })
);

// Use express-ejs-layouts for layout structure
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Parse incoming request bodies
app.use(express.urlencoded({ extended: true }));

// Configure passport for authentication
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Set up routes using express router
app.use('/', require('./routes'));

// Listen on specified port
app.listen(port, function (error) {
  if (error) {
    console.log(`Error in connecting to server: ${error}`);
    return;
  }
  console.log(`Server running on port: ${port}`);
});
