const driver = require('./neo4jSession');

const fetchJobsBySkills = async (userId) => {
    const session = driver.session();

    try {
        const userSkillsQuery = `
            MATCH (u:User {id: $userId})-[r:HAS_SKILL]->(s:Skill)
            RETURN s.id AS skillId, r.level AS skillLevel
        `;
        const userSkillsResult = await session.run(userSkillsQuery, { userId: userId.toString() });
        if (userSkillsResult.records.length === 0) {
            console.log("User has no skills: ", userId);
            return [];
        }
        const userSkills = userSkillsResult.records.map(record => ({
            skillId: record.get('skillId'),
            skillLevel: record.get('skillLevel')
        }));

        const jobSkillsQuery = `
            MATCH (j:Job)-[:REQUIRES_SKILL]->(s:Skill)
            WHERE s.id IN $userSkills
            RETURN DISTINCT j.id AS jobId
        `;

        const jobSkillsResult = await session.run(jobSkillsQuery, {
            userSkills: userSkills.map(skill => skill.skillId.toString())
        });

        if (jobSkillsResult.records.length === 0) {
            console.log("No matching jobs found.");
            return [];
        }

        // Extract job IDs from query result
        const jobIds = jobSkillsResult.records.map(record => record.get('jobId'));

        return jobIds;

    } catch (error) {
        console.error("Error fetching jobs by skills:", error);
        return [];
    }
    finally {
        await session.close();
    }
}

module.exports = fetchJobsBySkills;