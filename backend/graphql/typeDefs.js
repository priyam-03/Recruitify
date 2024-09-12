// const { gql } = require("apollo-server-express");

const typeDefs = `
  type User {
    _id: ID!
    name: String!
    email: String!
    role: String
  }

  type JobApplication {
    _id: String!
    jobRole: String!
    jobLocation: String!
    company: String!
    applicantProfiles: [ApplicantProfile]
    ownerProfile: User
  }
  type UserName{
    _id: ID!
    name: String!
  }
  type ApplicantProfile {
    userId: UserName
    status: String!
    resume: String
  }

  type Query {
    jobAppliedByMe(status: String): [JobApplication]
    users: [User]
  }

  type Mutation {
    applyJob(jobId: ID!, resume: String!): JobApplication
  }
`;

module.exports = typeDefs;
