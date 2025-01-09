const JobApplicationForm = require('../models/jobForms.js');
const mongoose = require('mongoose');
const { index } = require('./connectVectorDB.js');
const connectDatabase = require('../database/database.js');

const makeLower = (text) => {
    if (!text) return '';
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

        for (let job of jobs) {
            const queryText = makeLower(job.jobRole) + " " + makeLower(job.jobDescription);
            const fetchedJobIds = await index.query({
                data: queryText,
                topK: 5,
                includeVectors: false,
                includeMetadata: false,
            });

            if (!fetchedJobIds || !Array.isArray(fetchedJobIds)) {
                console.log(fetchedJobIds);
                throw new Error(
                    "Invalid response format: 'result' is undefined or not an array"
                );
            }

            const similarJobids = fetchedJobIds.map((job) => {
                if (!job.id) throw new Error("Missing 'id' field in one of the results");
                return mongoose.Types.ObjectId(job.id);
            });
            job.similarJobs = similarJobids;
            await job.save();
        }
        console.log("batch job successfully added to the vector database.");

    } catch (error) {
        console.error("Error while adding data to vector DB:", error);
    }
    finally {
        mongoose.connection.close();
    }
};

const addJobDataToVDB = async (jobId) => {
    try {
        const job = await JobApplicationForm.findById(jobId).select('_id jobRole jobDescription');
        if (!job || job.length === 0) {
            console.log("No jobs found.");
            return;
        }

        const queryText = makeLower(job.jobRole) + " " + makeLower(job.jobDescription);
        const fetchedJobIds = await index.query({
            data: queryText,
            topK: 5,
            includeVectors: false,
            includeMetadata: false,
        });

        if (!fetchedJobIds || !Array.isArray(fetchedJobIds)) {
            console.log(fetchedJobIds);
            throw new Error(
                "Invalid response format: 'result' is undefined or not an array"
            );
        }

        const similarJobids = fetchedJobIds.map((job) => {
            if (!job.id) throw new Error("Missing 'id' field in one of the results");
            return mongoose.Types.ObjectId(job.id);
        });

        const modifiedJob = {
            id: job._id.toString(),
            description: queryText,
        };

        await index.upsert({
            id: modifiedJob.id,
            data: modifiedJob.description,
        });

        console.log("Job successfully added to the vector database.");
        return similarJobids;

    } catch (error) {
        console.error("Error while adding data to vector DB:", error);
    }
}

module.exports = addJobDataToVDB;


