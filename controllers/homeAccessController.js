// Import the Student model
const Student = require('../models/studentModel');

// Controller to render the home page
module.exports.homePage = async function (req, res) {
  try {
    // Fetch all students from the database
    const students = await Student.find({});

    // Render the 'home' view and pass the students data to the view
    return res.render('mainView', { students });
  } catch (error) {
    // Handle any errors that occur during the process

    // Log the error to the console for debugging purposes
    console.log(`Error in rendering home page: ${error}`);
    
    // Redirect the user back to the previous page in case of an error
    return res.redirect('back');
  }
};
