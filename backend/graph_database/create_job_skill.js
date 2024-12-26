const driver = require('./neo4jSession');

const createJobSkillRelation = async (job) => {
    if (!job || !job.requiredSkills || job.requiredSkills.length === 0) {
        if (!job) {
            console.log('not a perfeect job\n');
        }
        if (!job.requiredSkills) {
            console.log('not a perfeect job skillList\n');
        }
        if (job.requiredSkills.length) {
            console.log('skill-list is empty...');
        }
        return;
    }
    const session = driver.session();
    try {
        await session.writeTransaction(async (tx) => {
            const query = `CREATE (:Job {id: $jobId})`;
            await tx.run(query, { jobId: job._id.toString() });
        });

        for (const skillId of job.requiredSkills) {
            await session.writeTransaction(async (tx) => {
                const query = `
                    MATCH (j:Job {id: $jobId})
                    MATCH (s:Skill {id: $skillId})
                    CREATE (j)-[:REQUIRES_SKILL]->(s)`;
                await tx.run(query, {
                    jobId: job._id.toString(),
                    skillId: skillId.toString()
                });
            });
        }

        console.log('Job and skill relationships created successfully.');
    } catch (error) {
        console.error("Error migrating jobs and skills:", error);
    } finally {
        await session.close();

    }
};

module.exports = createJobSkillRelation;
