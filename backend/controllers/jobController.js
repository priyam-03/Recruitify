const mongoose = require("mongoose");
const JobApplicationForm = require("../models/jobForms");
const Userauth = require("../models/userModel.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const { compare } = require("bcryptjs");
const fetchJobsBySkills = require('../graph_database/fetch_jobs.js');
const createJobSkillRelation = require('../graph_database/create_job_skill.js');
const addJobDataToVDB = require('../vector_database/addJobData.js');
const { index } = require('../vector_database/connectVectorDB.js');
exports.createJobForms = catchAsyncErrors(async (req, res) => {
  try {
    const userId = req.user._id;
    const { content } = req.body;

    const formDetails = {
      ownerProfile: userId,
      jobRole: content.jobRole || "",
      jobLocation: content.jobLocation || "",
      jobLocationType: content.jobLocationType || "",
      company: content.company || "",
      jobDescription: content.jobDescription || "",
      requiredSkills: content.requiredSkills || [],
      totalDuration: {
        value:
          (content.totalDuration && content.totalDuration.value) || undefined,
        mode:
          (content.totalDuration && content.totalDuration.mode) || undefined,
      },
      workingHours: {
        value:
          (content.workingHours && content.workingHours.value) || undefined,
        mode: (content.workingHours && content.workingHours.mode) || undefined,
      },
      salary: {
        value: (content.salary && content.salary.value) || undefined,
        currency: (content.salary && content.salary.currency) || undefined,
        mode: (content.salary && content.salary.mode) || undefined,
      },
    };

    if (
      content.salary &&
      content.salary.mode &&
      (!content.salary.value || !content.salary.currency)
    ) {
      formDetails.salary = {};
    }

    if (content.totalDuration && content.totalDuration.mode === "full-time") {
      formDetails.totalDuration.value = 0;
    } else if (
      content.totalDuration &&
      content.totalDuration.mode &&
      !content.totalDuration.value
    ) {
      formDetails.totalDuration = {};
    }

    if (
      content.salary &&
      content.salary.currency &&
      (!content.salary.value || !content.salary.mode)
    ) {
      formDetails.salary = {};
    }

    if (content.workingHours && !content.workingHours.value) {
      formDetails.workingHours = {};
    }

    const newJobForm = new JobApplicationForm(formDetails);
    const jobForm = await newJobForm.save();
    createJobSkillRelation(jobForm);
    await addJobDataToVDB(jobForm._id);
    res.status(200).json(jobForm);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
});

exports.fetchMyJobForms = catchAsyncErrors(async (req, res) => {
  try {
    const userId = req.user._id;
    console.log("userid = " + userId);
    const jobForms = await JobApplicationForm.find({ ownerProfile: userId })
      .select("_id jobRole jobLocation company requiredSkills")
      .populate({
        path: "ownerProfile",
        select: "_id name avatar.filePath",
      })
      .populate({
        path: "applicantProfiles.userId",
        select: "_id name avatar.filePath",
      })
      .sort({ timestamp: -1 });

    if (!jobForms || jobForms.length === 0) {
      return res
        .status(404)
        .json({ error: "You haven't posted any job application..." });
    }
    res.status(200).json(jobForms);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
});

exports.fetchAllJobForms = catchAsyncErrors(async (req, res) => {
  try {
    const userId = req.user._id;

    const userAuth = await Userauth.findById(userId);
    

    let recommendationStale = true;
    if (userAuth.recommendationBySkillFetchedAt) {
      recommendationStale = new Date() - userAuth.recommendationBySkillFetchedAt > 24*3600*1000;
    }

    if (recommendationStale) {
      try {
        const matchedJobIds = await fetchJobsBySkills(userId);
        userAuth.jobBySkills = matchedJobIds;
        userAuth.recommendationBySkillFetchedAt = new Date();
        await userAuth.save();
        console.log("Fetched jobs from Neo4j");
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    } else {
      console.log("Recommendation is still fresh, no need to fetch jobs.");
    }

    const allJobIdsSet = new Set();

    for (const jobId of userAuth.jobBySkills) {
      allJobIdsSet.add(jobId);
    }
    for (const rec of userAuth.jobRecommendations) {
      allJobIdsSet.add(rec.id);
    }

    const allJobIds = Array.from(allJobIdsSet);

    if (!allJobIds || allJobIds.length === 0) {
      return res.status(404).json({ error: "No jobs found for the user's skills" });
    }

    const jobForms = await JobApplicationForm.find()
      .select("_id jobRole jobLocation company requiredSkills")
      .populate({
        path:"requiredSkills"
      }
      )
      .populate({
        path: "ownerProfile",
        select: "_id name avatar.filePath",
      })
      .populate({
        path: "applicantProfiles.userId",
        select: "_id name avatar.filePath",
      })
      .sort({ timestamp: 1 });

    if (!jobForms || jobForms.length === 0) {
      return res.status(404).json({ error: "Jobs not found" });
    }

    res.status(200).json(jobForms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


exports.fetchJobById = catchAsyncErrors(async (req, res) => {
  try {
    const id = req.params.id;
    const formData = await JobApplicationForm.findById(id)
      .populate("ownerProfile")
      .populate({
      path: "applicantProfiles.userId",
      select: "_id name avatar",
      })
      .populate({
      path: "requiredSkills",
     // select: "_id skill",
      });
    res.status(200).json(formData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

exports.viewSimilarJobs = catchAsyncErrors(async (req, res) => {
  const makeLower = (text) => {
    if (!text) return '';
    return text
      .split(' ')
      .map((word) => word.toLowerCase())
      .join(' ');
  };
  try {
    const userId = req.user._id;
    const { formId } = req.body;
    if (!formId) {
      return res.status(400).json({ error: "formId is required" });
    }
    const userAuth = await Userauth.findById(userId);
    if (!userAuth) {
      return res.status(404).json({ error: "User not found" });
    }
    const jobFrom = await JobApplicationForm.findById(formId).select('_id jobRole jobDescription');
    if (!jobFrom) {
      return res.status(404).json({ error: "Job application not found" });
    }
    const queryText = makeLower(jobFrom.jobRole) + " " + makeLower(jobFrom.jobDescription)
    const fetchedJobIds = await index.query({
      data: queryText,
      topK: 2,
      includeVectors: false,
      includeMetadata: false
    });
    if (!fetchedJobIds || !Array.isArray(fetchedJobIds)) {
      console.log(fetchedJobIds)
      throw new Error("Invalid response format: 'result' is undefined or not an array");
    }

    const jobIds = fetchedJobIds.map((job) => {
      if (!job.id) throw new Error("Missing 'id' field in one of the results");
      return mongoose.Types.ObjectId(job.id);
    });
    for (const jobId of jobIds) {
      if (jobId.toString() === formId.toString()) continue;
      console.log(`Fetched recommended jobId: ${jobId}`);
      if (!Array.isArray(userAuth.jobRecommendations)) {
        userAuth.jobRecommendations = [];
      }

      const existingIndex = userAuth.jobRecommendations.findIndex(
        (job) => job.id.toString() === jobId.toString()
      );

      if (existingIndex !== -1) {
        userAuth.jobRecommendations[existingIndex].timestamp = new Date();
      } else {
        userAuth.jobRecommendations.push({ id: jobId, timestamp: new Date() });
      }
    }
    await userAuth.save();
   
    console.log("successfully fetched recomended jobs");
    return res.status(201).json({ message: "Successful.." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
})

exports.applyForJob = catchAsyncErrors(async (req, res) => {
  try {
    const userId = req.user._id;

    const { formId } = req.body;
    const user = await Userauth.findById(userId);
    if (user.resume == undefined) {
      return res.status(400).json({ error: "Please upload your resume" });
    }
    const jobApplicationForm = await JobApplicationForm.findById(formId);

    if (!jobApplicationForm) {
      return res.status(404).json({ error: "Job application form not found" });
    }

    if (jobApplicationForm.ownerProfile.equals(userId)) {
      return res
        .status(400)
        .json({ error: "You cannot apply to your own job" });
    }
    const hasApplied = jobApplicationForm.applicantProfiles.some((applicant) =>
      applicant.userId.equals(userId)
    );
    if (hasApplied) {
      return res
        .status(400)
        .json({ error: "You have already applied for this job" });
    }
    jobApplicationForm.applicantProfiles.push({
      userId,
    });
    await jobApplicationForm.save();

    res.status(201).json({ message: "Application successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

exports.jobAppliedByMe = catchAsyncErrors(async (req, res) => {
  try {
    const userId = req.user._id;
    const jobForms = await JobApplicationForm.find({
      "applicantProfiles.userId": userId,
    });

    res.json(jobForms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const axios = require("axios");
const path = require("path");

exports.shortlist = catchAsyncErrors(async (req, res) => {
  try {
    const { formId, noOfApplicants } = req.query;

    // Fetch the job application form with applicant profiles
    const jobApplicationForm = await JobApplicationForm.findById(
      formId
    ).populate("applicantProfiles.userId", "_id resume");

    if (!jobApplicationForm) {
      return res.status(404).json({ error: "Job application form not found" });
    }

    // Check if the requester is the owner of the job application form
    const isOwner = jobApplicationForm.ownerProfile.equals(req.user._id);
    if (!isOwner) {
      return res
        .status(401)
        .json({ error: "You are not authorized to perform this action" });
    }

    // Prepare data to send to Flask API
    const applicantsData = jobApplicationForm.applicantProfiles.map(
      (profile) => ({
        user_id: profile.userId._id,
        s3_key: profile.userId.resume,
      })
    );
    if (noOfApplicants > applicantsData.length) {
      return res.status(400).json({
        error: "Number of applicants exceeds the total number of applicants",
      });
    }
    if (noOfApplicants.length <= 0) {
      return res
        .status(400)
        .json({ error: "Please enter the number of applicants to shortlist" });
    }
    const requestData = {
      applicants: applicantsData,
      jobDescription: jobApplicationForm.jobDescription,
      job_id: formId.toString(),
      noOfApplicants: parseInt(noOfApplicants),
    };

    // Send the data to Flask API
    const flaskResponse = await axios.post(
      "http://127.0.0.1:5000/process_s3",
      requestData
    );
    if (flaskResponse.status !== 200) {
      return res.status(500).json({ error: flaskResponse.status });
    }
    flaskResponse.data.topApplicants.map((id) => {
      jobApplicationForm.applicantProfiles.find((profile) => {
        if (profile.userId._id.toString() === id) {
          profile.status = "shortlisted";
        }
      });
    });
    await jobApplicationForm.save();

    const shortlisted = await JobApplicationForm.findById(formId).populate(
      "applicantProfiles.userId",
      "name"
    );
    shortlisted.applicantProfiles.filter(
      (profile) => profile.status === "shortlisted"
    );
    res.json(shortlisted.applicantProfiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
