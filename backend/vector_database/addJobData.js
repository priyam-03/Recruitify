const JobApplicationForm = require('../models/jobForms.js');
const mongoose = require('mongoose');
const { index } = require('./connectVectorDB.js');
const connectDatabase = require('../database/database.js');

const makeLower = (text) => {
    if (!text) return ''; // Handle null or undefined text
    return text
        .split(' ')
        .map((word) => word.toLowerCase())
        .join(' ');
};

const add_batch_data_to_vdb = async () => {
    await connectDatabase();
    try {
        const jobs = await JobApplicationForm.find().select('_id jobRole jobDescription');
        if (!jobs || jobs.length === 0) {
            console.log("No jobs found.");
            return;
        }
        
        let modifiedJobs = jobs.map((job) => ({
            id: job._id.toString(),
            description:makeLower(job.jobRole) + " " + makeLower(job.jobDescription)
        }));

        for(let job of modifiedJobs){
            await index.upsert({
                id: job.id,
                data: job.description
              });
        }
        console.log("batch job successfully added to the vector database.");

    } catch (error) {
        console.error("Error while adding data to vector DB:", error);
    }
    finally{
        mongoose.connection.close();
    }
};

const addJobDataToVDB = async(jobId) =>{
    try {
        const job = await JobApplicationForm.findById(jobId).select('_id jobRole jobDescription');
        if (!job || job.length === 0) {
            console.log("No jobs found.");
            return;
        }

        const modifiedJob = {
            id: job._id.toString(),
            description: makeLower(job.jobRole) + " " + makeLower(job.jobDescription),
        };

        await index.upsert({
            id: modifiedJob.id,
            data: modifiedJob.description,
        });

        console.log("Job successfully added to the vector database.");

    } catch (error) {
        console.error("Error while adding data to vector DB:", error);
    }
}

module.exports = addJobDataToVDB;

// add_batch_data_to_vdb();

