const mongoose = require('mongoose');
const Skill = require('../models/skillModel.js');
const Userauth = require("../models/userModel.js");
const Jobs = require("../models/jobForms.js");

const connectDatabase = require('../database/database.js');
const neo4j = require('neo4j-driver');
require("dotenv").config({ path: "./secret.env" });

const driver = require('./neo4jSession.js');

const insertSkills = async () => {
    const session = driver.session();

    try {
        await connectDatabase(); // Connect to MongoDB
        const skills = await Skill.find(); // Fetch skills from MongoDB

        if (!skills.length) {
            console.log('No skills found');
            return;
        }

        // Start a write transaction to Neo4j
        await session.writeTransaction(async (tx) => {
            // Generate queries for each skill
            const queries = skills.map((skill) => {
                // Ensure that _id is quoted as a string and name is valid
                return `CREATE (:Skill {id: "${skill._id.toString()}"})`;
            });

            // Execute the queries in the transaction
            await tx.run(queries.join("\n"));
        });

        console.log("Skills inserted successfully!");
    } catch (error) {
        console.error("Error inserting skills:", error);
    } finally {
        await session.close();
        await driver.close();
        mongoose.connection.close(); // Close the MongoDB connection
    }
};



const fetchAllSkills = async () => {
    const session = driver.session();

    try {

        // Start a read transaction to fetch all skills from Neo4j
        const result = await session.readTransaction(async (tx) => {
            const query = 'MATCH (s:Skill) RETURN s';  // Match all nodes labeled as Skill
            const response = await tx.run(query);
            return response.records;  // Return all records
        });

        // Log each skill to the console
        result.forEach((record) => {
            const skill = record.get('s');  // Access the Skill node
            console.log(`Skill ID: ${skill.properties.id}`);
        });
        console.log("length = ", result.length);
    } catch (error) {
        console.error("Error fetching skills from Neo4j:", error);
    } finally {

        await session.close();
        await driver.close(); // Close the session after the transaction
    }
};


const deleteAllSkills = async () => {
    const session = driver.session();

    try {

        // Start a write transaction to delete all skills from Neo4j
        await session.writeTransaction(async (tx) => {
            const query = 'MATCH (s:Skill) DETACH DELETE s';  // Match all Skill nodes and delete them
            await tx.run(query);
            console.log("All skills deleted successfully!");
        });
    } catch (error) {
        console.error("Error deleting skills from Neo4j:", error);
    } finally {
        await session.close();
        await driver.close(); // Close the session after the transaction
    }
};





const deleteSkillsFromAllUsers = async () => {
    connectDatabase();
    try {

        const result = await Userauth.updateMany(
            {},
            { $set: { skills: [] } }  // Set skills to an empty array
        );

        if (result.modifiedCount === 0) {
            console.log("No users had skills to delete.");
        } else {
            console.log(`${result.modifiedCount} users' skills have been deleted.`);
        }
    } catch (error) {
        console.error("Error deleting skills from users:", error);
    } finally {
        mongoose.connection.close();
    }
};

const assignRandomSkillsToUsers = async () => {
    try {
        connectDatabase();
        const allSkills = await Skill.find().select('_id name');
        if (allSkills.length === 0) {
            console.log("No skills found in the Skills collection.");
            return;
        }

        const users = await Userauth.find();

        for (const user of users) {
            const randomSkills = [];
            const selectedSkills = [];

            while (randomSkills.length < 5) {
                const randomSkill = allSkills[Math.floor(Math.random() * allSkills.length)];
                if (!selectedSkills.includes(randomSkill.name)) {
                    randomSkills.push(randomSkill);
                    selectedSkills.push(randomSkill.name);
                }
            }

            const skillsWithLevels = randomSkills.map(skill => ({
                skillId: skill._id,
                level: Math.floor(Math.random() * 3) + 3, // Random level between 3 and 5
            }));

            user.skills = skillsWithLevels;
            await user.save();

            console.log(`Updated skills for user: ${user.name}`);
        }
    } catch (error) {
        console.error("Error assigning random skills to users:", error);
    } finally {
        // Close the connection once the operation is complete
        mongoose.connection.close();
    }
};

const deleteSkillsFromAllJobs = async () => {
    connectDatabase();
    try {
        const result = await Jobs.updateMany(
            {},
            { $set: { requiredSkills: [] } }  
        );

        if (result.modifiedCount === 0) {
            console.log("No jobs had skills to delete.");
        } else {
            console.log(`${result.modifiedCount} jobs' skills have been deleted.`);
        }
    } catch (error) {      
        console.error("Error deleting skills from jobs:", error);
    } finally { 
        mongoose.connection.close();
    }
}

const assignRandomSkillsToJobs = async () => {
    connectDatabase();
    try {
        
        const allSkills = await Skill.find().select('_id skill');
        if (allSkills.length === 0) {
            console.log("No skills found in the Skills collection.");
            return;
        }
        const jobs = await Jobs.find();

        for (const job of jobs) {
            const randomSkills = [];
            const selectedSkills = [];

            while (randomSkills.length < 5) {
                const randomSkill = allSkills[Math.floor(Math.random() * allSkills.length)];
                if (!selectedSkills.includes(randomSkill.skill)) {
                    randomSkills.push(randomSkill._id);
                    selectedSkills.push(randomSkill.skill);
                }
            }

          

            job.requiredSkills = randomSkills.map(skill => skill._id);
            await job.save();

            console.log(`Updated skills for job: ${job._id}`);
        }


    } catch (error) {
        console.log("Error assigning random skills to jobs:", error);
    }
    finally {
        mongoose.connection.close();
    }
}

const migrateUsersAndSkills = async () => {
    const session = driver.session();
    try {
        await connectDatabase();
        const users = await Userauth.find();
        for (const user of users) {
            const skills = user.skills;
            for (const skill of skills) {
                const skillId = skill.skillId;
                const level = skill.level;
                await session.writeTransaction(async (tx) => {
                    const query = `MATCH (u:User {id: "${user._id.toString()}"})
                    MATCH (s:Skill {id: "${skillId.toString()}"})
                    CREATE (u)-[:HAS_SKILL {level: ${level}}]->(s)`;
                    await tx.run(query);
                });
            }
        }
        console.log("Users and skills migrated successfully!");

    } catch (error) {
        console.error("Error migrating users and skills:", error);
    }
    finally {
        await session.close();
        await driver.close();
        mongoose.connection.close();
    }
}

const migrateJobsAndSkills = async () => {  
    const session = driver.session();
    await connectDatabase();
    try {
        const jobs = await Jobs.find().select('_id requiredSkills');
        for (const job of jobs) {
            const skills = job.requiredSkills;
            for (const skillId of skills) {
                await session.writeTransaction(async (tx) => {
                    const query = `MATCH (j:Job {id: "${job._id.toString()}"})
                    MATCH (s:Skill {id: "${skillId.toString()}"})
                    CREATE (j)-[:REQUIRES_SKILL]->(s)`;
                    await tx.run(query);
                });
            }
        }
        console.log("Jobs and skills migrated successfully!");
    } catch (error) {
        console.error("Error migrating jobs and skills:", error);
    }
    finally {
        await session.close();
        await driver.close();
        mongoose.connection.close();
    }
}

async function fetchUsersAndSkills() {
    const session = driver.session();
    try {
        const result = await session.run(`
          MATCH (u:User)-[r:HAS_SKILL]->(s:Skill)
          RETURN u, collect({skill: s, level: r.level}) AS skills
        `);

        result.records.forEach((record) => {
            const user = record.get("u").properties;
            const skills = record.get("skills");

            console.log(`User: ${user.id}`);
            if (skills.length > 0) {
                console.log("Skills:");
                skills.forEach((entry, index) => {
                    const skill = entry.skill.properties;
                    const level = entry.level;
                    console.log(
                        `  ${index + 1}. Skill Name: ${skill.id}, Level: ${level}`
                    );
                });
            } else {
                console.log("  No skills found.");
            }
            console.log("\n");
        });
    } catch (error) {
        console.error("Error fetching users and skills from Neo4j:", error);
    } finally {
        await session.close();
        await driver.close();
    }
}



async function deleteAllEntriesFromNeo4j() {
    const session = driver.session();
    try {
        // Query to delete all nodes and relationships
        await session.run(`
            MATCH (n)
            DETACH DELETE n
        `);

        console.log("Successfully deleted all nodes and relationships from the Neo4j graph.");
    } catch (error) {
        console.error("An error occurred while deleting nodes and relationships from Neo4j:", error);
    } finally {
        await session.close();
        await driver.close();
    }
}


const insertUsers = async () => {
    const session = driver.session();
    try {
        await connectDatabase();
        const users = await Userauth.find();
        for (const user of users) {
            await session.writeTransaction(async (tx) => {
                const query = `CREATE (:User {id: "${user._id.toString()}"})`;
                await tx.run(query);
            });
        }
        console.log("Users inserted successfully!");
    } catch (error) {
        console.error("Error inserting users:", error);
    } finally {
        await session.close();
        await driver.close();
        mongoose.connection.close();
    }
}

const insertJobs = async () => {
    const session = driver.session();
    try {
        connectDatabase();
        const jobs = await Jobs.find();
        if (jobs.length === 0) {
            console.log("No jobs found in the Jobs collection.");
            return;
        }

        await session.writeTransaction(async (tx) => {
            const queries = jobs.map((job) => {
                return `CREATE (:Job {id: "${job._id.toString()}"})`;
            });

            await tx.run(queries.join("\n"));
        });
        console.log("Jobs inserted successfully!");
    } catch (error) {
        console.error("Error inserting jobs:", error);
    }
    finally{
        await session.close();
        await driver.close();
        mongoose.connection.close();
    }
}


// insertSkills();

// insertJobs();
// insertUsers();

// deleteSkillsFromAllUsers();
// deleteSkillsFromAllJobs();

// assignRandomSkillsToJobs();
// assignRandomSkillsToUsers();

// migrateJobsAndSkills();
// migrateUsersAndSkills();



// deleteAllEntriesFromNeo4j();
// fetchUsersAndSkills();





// deleteAllSkills();

// fetchAllSkills();


