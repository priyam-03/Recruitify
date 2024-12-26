const mongoose = require('mongoose');
const driver = require('./neo4jSession');

const createUserSkillRelation = async (userId, skillId, level) => {
    // Validate inputs
    if (!userId || !skillId || !level) {
        if (!userId) {
            console.log('Missing userId');
        }
        if (!skillId) {
            console.log('Missing skillId');
        }
        if (!level) {
            console.log('Missing level');
        }
        return;
    }

    const session = driver.session(); // Start Neo4j session
    try {
        // Ensure the User node exists
        await session.writeTransaction(async (tx) => {
            const query = `
                MERGE (u:User {id: $userId})
            `;
            await tx.run(query, { userId: userId.toString() });
        });

        // Ensure the Skill node exists (optional if it's guaranteed to exist elsewhere)
        await session.writeTransaction(async (tx) => {
            const query = `
                MERGE (s:Skill {id: $skillId})
            `;
            await tx.run(query, { skillId: skillId.toString() });
        });

        // Create the relationship between User and Skill
        await session.writeTransaction(async (tx) => {
            const query = `
                MATCH (u:User {id: $userId})
                MATCH (s:Skill {id: $skillId})
                MERGE (u)-[:HAS_SKILL {level: $level}]->(s)
            `;
            await tx.run(query, {
                userId: userId.toString(),
                skillId: skillId.toString(),
                level: level
            });
        });

        console.log("User and skill relationship created successfully!");
    } catch (error) {
        console.error("Error creating user-skill relationship:", error);
    } finally {
        await session.close(); // Close the Neo4j session
        await driver.close();  // Close the driver
    }
};

module.exports = createUserSkillRelation;
