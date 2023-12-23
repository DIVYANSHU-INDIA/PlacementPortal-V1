// Import the mongoose library
const mongoose = require('mongoose');

// Connect to MongoDB using the provided connection string
mongoose.connect('mongodb+srv://maildivyanshuupadhyay:qUUVQ5WZGHzYDt68@cluster0.5apr37h.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true, // Use the new URL parser
  useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
});

// Get the default connection
const db = mongoose.connection;

// Event listener for error events on the connection
db.on('error', console.error.bind(console, 'Error in connecting to MongoDB'));

// Event listener for once the connection is open
db.once('open', function () {
  console.log('Connected to Database :: Mongodb');
});

// Export the connection object for external use
module.exports = db;
