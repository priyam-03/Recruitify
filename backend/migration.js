const connectDatabase = require("./database/database");
connectDatabase();
const Skill = require("./models/skillModel");

Skill.deleteMany({}, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("All skills deleted!");
  }
});

// delet all jobs from database
const Job = require("./models/jobForms");
// const mongoose = require("mongoose");
// Connect to the database
// mongoose.connect('mongodb://localhost:27017/jobsDB', { useNewUrlParser: true, useUnifiedTopology: true });
// Delete all the jobs
Job.deleteMany({}, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("All jobs deleted!");
  }
});

//delete all skills from all users
const User = require("./models/userModel");
// const mongoose = require("mongoose");
// Connect to the database
// mongoose.connect('mongodb://localhost:27017/usersDB', { useNewUrlParser: true, useUnifiedTopology: true });
// Delete all the skills
User.updateMany({}, { $set: { skills: [] } }, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("All skills deleted from all users!");
  }
});
