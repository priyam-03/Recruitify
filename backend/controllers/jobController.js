const mongoose = require('mongoose');
const JobApplicationForm = require('../models/jobForms');
const Userauth = require("../models/userModel.js");
const catchAsyncErrors = require('../middleware/catchAsyncErrors.js');
const JobUserDetails = require('../models/jobUserDetails.js');
const jobUserDetails = require('../models/jobUserDetails.js');


exports.createJobForms = catchAsyncErrors(async (req, res) => {
    try {
        const { user, content } = req.body;
        console.log("user = " + user);

        const author = await Userauth.findOne({ email: user });
        if (!author) {
            console.log("user not found");
            return res.status(404).json({ error: 'User not found' });
        }

        const newJobForm = new JobApplicationForm({
            ownerProfile: author._id,
            jobRole: content.jobRole,
            jobDescription: content.jobDescription,
            requiredUserDetails: content.userDetails,
        })

        const saveJobForm = await newJobForm.save();
        await JobApplicationForm.populate(saveJobForm, { path: 'ownerProfile' });
        res.status(200).json(saveJobForm);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


exports.fetchJobForms = catchAsyncErrors(async (req, res) => {
    try {
        const userId = req.params.id;
        console.log("userid = " + userId);
        let jobForms;

        if (userId && mongoose.isValidObjectId(userId)) {
            console.log("author found");
            jobForms = await JobApplicationForm.find({ ownerProfile: userId })
                .populate('ownerProfile')
                .populate({
                    path: 'applicantProfiles',
                    select: 'name email avatar' // Specify the fields to populate
                })
                .sort({ timestamp: -1 });
        } else {
            jobForms = await JobApplicationForm.find()
                .populate('ownerProfile')
                .populate({
                    path: 'applicantProfiles',
                    select: 'name email avatar' // Specify the fields to populate
                })
                .sort({ timestamp: -1 });
        }

        if (!jobForms || jobForms.length === 0) {
            return res.status(404).json({ error: 'Posts not found' });
        }

        res.status(200).json(jobForms);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

exports.applyForJob = catchAsyncErrors(async (req, res) => {
    try {
        const { userId, formId, userDetails } = req.body;
        console.log("userId == " + userId);
        console.log("formId == " + formId);
        console.log("user details: " + JSON.stringify(userDetails));

        const details = {
            name: '',
            email: '',
            address: '',
            contactNo: '',
            institution: '',
            rollNo: '',
            cgpaOrPercentage: '',
            yearOfGraduation: '',
            resume: '',
        };

        Object.keys(userDetails).forEach((field) => {
            if (details.hasOwnProperty(field)) {
                details[field] = userDetails[field];
            }
        });
        await JobApplicationForm.findByIdAndUpdate(
            formId,
            { $push: { applicantProfiles: userId } },
            { new: true }
        );

        const newJobDetails = new JobUserDetails({
            jobForm: formId,
            applicantProfile: userId,
            userDetails: details
        });

        const savedJobForm = await newJobDetails.save();

        const jobForms = await JobApplicationForm.find()
            .populate('ownerProfile')
            .populate({
                path: 'applicantProfiles',
                select: 'name email avatar' // Specify the fields to populate
            })
            .sort({ timestamp: -1 });
        res.status(201).json(jobForms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
