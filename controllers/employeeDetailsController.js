// Import necessary models and libraries
const Employee = require('../models/employeeModel');
const Student = require('../models/studentModel');
const fs = require('fs');
const fastcsv = require('fast-csv');

// Render the sign-up page
module.exports.signup = function (req, res) {
  // Check if the user is already authenticated, redirect back if true
  if (req.isAuthenticated()) {
    return res.redirect('back');
  }
  res.render('signupView');
};

// Render the sign-in page
module.exports.signin = function (req, res) {
  // Check if the user is already authenticated, redirect back if true
  if (req.isAuthenticated()) {
    return res.redirect('back');
  }
  res.render('signinView');
};

// Create a session upon successful login
module.exports.createSession = function (req, res) {
  console.log('Session created successfully');
  return res.redirect('/');
};

// Sign out the user
module.exports.signout = function (req, res) {
  req.logout();
  return res.redirect('/employee/signin');
};

// Create a new employee (user) in the database
module.exports.createEmployee = async function (req, res) {
  const { name, email, password, confirmPassword } = req.body;
  try {
    // Check if the passwords match
    if (password !== confirmPassword) {
      console.log(`Passwords don't match`);
      return res.redirect('back');
    }

    // Check if an employee with the same email already exists
    const employee = await Employee.findOne({ email });
    if (employee) {
      console.log(`Email already exists`);
      return res.redirect('back');
    }

    // Create a new employee document
    const newEmployee = await Employee.create({
      name,
      email,
      password,
    });

    await newEmployee.save();

    // Check if the employee was created successfully, redirect to sign-in page
    if (!newEmployee) {
      console.log(`Error in creating user`);
      return res.redirect('back');
    }

    // Redirect to sign-in page after creating the employee
    return res.redirect('/employee/signin');
  } catch (error) {
    console.log(`Error in creating user: ${error}`);
    res.redirect('back');
  }
};

// Download a CSV report containing student data
module.exports.downloadCsv = async function (req, res) {
  try {
    // Fetch all students from the database
    const students = await Student.find({});

    let data = '';
    let no = 1;
    let csv =
      'S.No, Name, Email, College, Placemnt, Contact Number, Batch, DSA Score, WebDev Score, React Score, Interview, Date, Result';

    // Iterate through each student and append their data to the CSV string
    for (let student of students) {
      data =
        no +
        ',' +
        student.name +
        ',' +
        student.email +
        ',' +
        student.college +
        ',' +
        student.placement +
        ',' +
        student.contactNumber +
        ',' +
        student.batch +
        ',' +
        student.dsa +
        ',' +
        student.webd +
        ',' +
        student.react;

      // If the student has interviews, append interview data to the CSV string
      if (student.interviews.length > 0) {
        for (let interview of student.interviews) {
          data +=
            ',' +
            interview.company +
            ',' +
            interview.date.toString() +
            ',' +
            interview.result;
        }
      }
      no++;
      csv += '\n' + data;
    }

    // Write the CSV data to a file in the 'report' folder
    const dataFile = fs.writeFile(
      'report/data.csv',
      csv,
      function (error, data) {
        if (error) {
          console.log(error);
          return res.redirect('back');
        }
        console.log('Report generated successfully');
        // Download the CSV file
        return res.download('report/data.csv');
      }
    );
  } catch (error) {
    console.log(`Error in downloading file: ${error}`);
    return res.redirect('back');
  }
};

// Author: Divyanshu
// Language: JavaScript (Node.js)
