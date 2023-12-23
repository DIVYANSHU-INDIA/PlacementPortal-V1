// Import necessary models
const Company = require('../models/companyModel');
const Student = require('../models/studentModel');

// Controller to render the 'create student' page
module.exports.createStudentPage = async function (req, res) {
  // Render the 'addStudentView' view
  return res.render('addStudentView');
};

// Controller to create a new student
module.exports.createStudent = async function (req, res) {
  // Destructure student information from the request body
  const {
    name,
    email,
    batch,
    college,
    placement,
    contactNumber,
    dsa,
    webd,
    react,
  } = req.body;

  try {
    // Check if a student with the same email already exists
    const student = await Student.findOne({ email });

    // If a student with the same email exists, redirect back
    if (student) {
      console.log('Email already exists');
      return res.redirect('back');
    }

    // Create a new student document and save it to the database
    const newStudent = await Student.create({
      name,
      email,
      college,
      batch,
      placement,
      contactNumber,
      dsa,
      webd,
      react,
    });
    await newStudent.save();

    // Redirect to the home page after creating the student
    return res.redirect('/');
  } catch (error) {
    console.log(`Error in creating student: ${error}`);
    // Redirect back in case of an error
    return res.redirect('back');
  }
};

// Controller to delete a student
module.exports.deleteStudent = async function (req, res) {
  // Extract student id from the request parameters
  const { id } = req.params;

  try {
    // Find the student using the provided id
    const student = await Student.findById(id);

    // If the student and interviews exist, delete the student from company interviews list
    if (student && student.interviews.length > 0) {
      for (let item of student.interviews) {
        const company = await Company.findOne({ name: item.company });
        if (company) {
          for (let i = 0; i < company.students.length; i++) {
            if (company.students[i].student.toString() === id) {
              // Remove the student from the company's students list
              company.students.splice(i, 1);
              company.save();
              break;
            }
          }
        }
      }
    }

    // Delete the student from the database
    await Student.findByIdAndDelete(id);

    // Redirect back after deleting the student
    res.redirect('back');
  } catch (error) {
    console.log('Error in deleting student');
    // Redirect back in case of an error
    return res.redirect('back');
  }
};
