const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Userauth = require("./userModel.js");

const JobApplicationFormSchema = new mongoose.Schema({
    jobRole: {
        type: String,
        required: true,
    },
    jobDescription: {
        type: String,
        required: true,
    },
    requiredUserDetails: {
        name: {
            isSelected: {
                type: Boolean,
                default: false,
            },
            isRequired: {
                type: Boolean,
                default: false,
            },
        },
        email: {
            isSelected: {
                type: Boolean,
                default: false,
            },
            isRequired: {
                type: Boolean,
                default: false,
            },
        },
        address: {
            isSelected: {
                type: Boolean,
                default: false,
            },
            isRequired: {
                type: Boolean,
                default: false,
            },
        },
        contactNo: {
            isSelected: {
                type: Boolean,
                default: false,
            },
            isRequired: {
                type: Boolean,
                default: false,
            },
        },
        institution: {
            isSelected: {
                type: Boolean,
                default: false,
            },
            isRequired: {
                type: Boolean,
                default: true,
            },
        },
        rollNo: {
            isSelected: {
                type: Boolean,
                default: false,
            },
            isRequired: {
                type: Boolean,
                default: false,
            },
        },
        cgpaOrPercentage: {
            isSelected: {
                type: Boolean,
                default: false,
            },
            isRequired: {
                type: Boolean,
                default: false,
            },
        },
        yearOfGraduation: {
            isSelected: {
                type: Boolean,
                default: false,
            },
            isRequired: {
                type: Boolean,
                default: false,
            },
        },
        resume: {
            isSelected: {
                type: Boolean,
                default: false,
            },
            isRequired: {
                type: Boolean,
                default: false,
            },
        },
    },
    ownerProfile: {
        type: Schema.Types.ObjectId,
        ref: 'Userauth',
        required: true,
    },
    applicantProfiles: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Userauth',
            required:true,
        }],
        default: [],
    },
    timestamp: { type: Date, default: Date.now },
    updated: { type: Date }
});

const JobApplicationForm = mongoose.model('JobApplicationForm', JobApplicationFormSchema);

module.exports = JobApplicationForm;
