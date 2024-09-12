const JobApplicationForm = require("../models/jobForms");
const User = require("../models/userModel");

const resolvers = {
  Query: {
    // Get all jobs the user has applied for
    jobAppliedByMe: async (_, { status }, { user }) => {
      const query = { "applicantProfiles.userId": user._id };
      if (status) {
        query["status"] = status;
      }

      const result = await JobApplicationForm.find(query)
        .populate("ownerProfile", "name")
        .populate("applicantProfiles.userId", "name");

      return result;
    },
  },

  Mutation: {
    // Apply to a job with a resume
    applyJob: async (_, { jobId, resume }, { req }) => {
      const userId = req.user._id;
      const job = await JobApplicationForm.findById(jobId);

      if (!job) throw new Error("Job not found");

      // Add the applicant to the job
      job.applicantProfiles.push({ userId, resume, status: "applied" });
      await job.save();

      return job;
    },
  },
};

module.exports = resolvers;
