const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const JobApplicationForm = require('./jobForms');

const JobUserDetailsSchema = new Schema({
    jobForm: {
        type: Schema.Types.ObjectId,
        ref: 'JobApplicationForm',
        required: true
    },
    applicantProfile: {
        type: Schema.Types.ObjectId,
        ref: 'Userauth',
        required: true,
    },
    userDetails: {
        name: {
            type: String,
            default: ''
        },
        email: {
            type: String,
            default: ''
        },
        address: {
            type: String,
            default: ''
        },
        contactNo: {
            type: String,
            default: ''
        },
        institution: {
            type: String,
            default: ''
        },
        rollNo: {
            type: String,
            default: ''
        },
        cgpaOrPercentage: {
            type: String,
            default: ''
        },
        yearOfGraduation: {
            type: String,
            default: ''
        },
        resume: {
            type: String,
            default: ''
        },
        timestamp: { type: Date, default: Date.now },
        updated: { type: Date },
    }
});

module.exports = mongoose.model('JobUserDetails', JobUserDetailsSchema);
