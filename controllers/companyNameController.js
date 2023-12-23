// Import necessary models
const Student = require('../models/studentModel');
const Company = require('../models/companyModel');

// Controller to render the company page and pass students to the view
module.exports.companyPage = async function (req, res) {
  try {
    // Fetch all students from the database
    const students = await Student.find({});
    // Render the 'company' view and pass the students to the page
    return res.render('companyView', { students });
  } catch (error) {
    console.log(`Error in rendering page: ${error}`);
    return res.redirect('back');
  }
};

// Controller to render the allocateInterview page and pass students to the view
module.exports.allocateInterview = async function (req, res) {
  try {
    // Fetch all students from the database
    const students = await Student.find({});
    // Render the 'allocateInterview' view and pass the students to the page
    return res.render('interviewView', { students });
  } catch (error) {
    console.log(`Error in allocating interview: ${error}`);
    return res.redirect('back');
  }
};

// Controller to schedule an interview for a student with a company
module.exports.scheduleInterview = async function (req, res) {
  console.log("req.body", req.body);
  const { id, company, date } = req.body;
  try {
    // Check if the company already exists in the database
    const existingCompany = await Company.findOne({ name: company });

    const obj = {
      student: id,
      date,
      result: 'Pending',
    };

    // If the company doesn't exist, create a new company and add the interview details
    if (!existingCompany) {
      const newCompany = await Company.create({
        name: company,
      });
      newCompany.students.push(obj);
      newCompany.save();
    } else {
      // If the company exists, check if the interview with the student already scheduled
      for (let studentData of existingCompany.students) {
        if (studentData.student.toString() === id) {
          console.log('Interview with this student already scheduled');
          return res.redirect('back');
        }
      }
      existingCompany.students.push(obj);
      existingCompany.save();
    }

    // Update the student's interviews with the scheduled interview
    const student = await Student.findById(id);
    if (student) {
      const interview = {
        company,
        date,
        result: 'Pending',
      };
      student.interviews.push(interview);
      student.save();
    }

    console.log('Interview Scheduled Successfully');
    return res.redirect('/company/home');
  } catch (error) {
    console.log(`Error in scheduling Interview: ${error}`);
    return res.redirect('back');
  }
};

// Controller to update the status of an interview
module.exports.updateStatus = async function (req, res) {
  const { id } = req.params;
  const { companyName, companyResult } = req.body;
  try {
    // Find the student by ID
    const student = await Student.findById(id);

    // If the student and interviews exist, update the interview result
    if (student && student.interviews.length > 0) {
      for (let interview of student.interviews) {
        if (interview.company === companyName) {
          interview.result = companyResult;
          student.save();
          break;
        }
      }
    }

    // Find the company by name
    const company = await Company.findOne({ name: companyName });

    // If the company exists, update the interview result for the student
    if (company) {
      for (let std of company.students) {
        if (std.student.toString() === id) {
          std.result = companyResult;
          company.save();
        }
      }
    }

    console.log('Interview Status Changed Successfully');
    return res.redirect('back');
  } catch (error) {
    console.log(`Error in updating status: ${error}`);
    res.redirect('back');
  }
};
