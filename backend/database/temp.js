const mongoose = require('mongoose');
const Skill = require('../models/skillModel.js'); // Assuming Skill model is in the same directory
const JobApplicationForm = require('../models/jobForms.js'); // Import JobApplicationForm model
const connectDatabase = require('./database.js');


async function fetchRequiredSkills(jobId) {
    try {
      connectDatabase();
      const objJobId = mongoose.Types.ObjectId(jobId);
            const job = await JobApplicationForm.findById(jobId);
  
      if (!job) {
        console.error(`No job found with ID: ${jobId}`);
        return;
      }
  
      const skillList = job.requiredSkills;
      const skills = []
      console.log("length = ",skillList.length)
      for(const skillId of skillList){
        console.log(skillId);
          const skill = await Skill.findById(skillId);
          skills.push(skill);
          console.log(skill);
      }
  
      console.log(`Required skills for job ID ${jobId}:`);
      skills.map((skill, index) => {
        console.log(`${index + 1}. ${skill.skill}`);
      });
    } catch (error) {
      console.error('Error fetching required skills:', error.message);
    }
    mongoose.connection.close();
  }
  
  
  const jobId = '676c2288d7ac9941480029e9'; // Replace with the actual Job ID
  fetchRequiredSkills(jobId);
  