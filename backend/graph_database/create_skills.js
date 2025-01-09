const mongoose = require('mongoose');
const Skill = require('../models/skillModel.js'); // Update the path to your Skill model
const connectDatabase = require('../database/database.js');
const techSkills = [
    "JavaScript", "Python", "Java", "C++", "C#", "Ruby", "PHP", "Swift", "Kotlin", "TypeScript",
    "HTML", "CSS", "React.js", "Angular", "Vue.js", "SASS", "Tailwind CSS", "Next.js", "Bootstrap", "Material-UI",
    "Node.js", "Express.js", "Nest.js", "Django", "Flask", "Spring Boot", "Ruby on Rails", "Laravel", "ASP.NET", "Koa.js",
    "MongoDB", "PostgreSQL", "MySQL", "SQLite", "Firebase", "Redis", "Cassandra", "Oracle Database", "DynamoDB", "Neo4j",
    "Docker", "Kubernetes", "AWS", "Azure", "Google Cloud Platform", "Terraform", "Ansible", "Jenkins", "GitLab CI/CD", "CircleCI",
    "Git", "GitHub", "Bitbucket", "Webpack", "Babel", "ESLint", "Prettier", "Nginx", "Apache", "Vercel",
    "React Native", "Flutter", "Ionic", "SwiftUI", "Xamarin", "Cordova", "Expo", "NativeScript", "Android SDK", "iOS SDK",
    "TensorFlow", "PyTorch", "Keras", "Scikit-learn", "Pandas", "NumPy", "OpenCV", "NLTK", "Hugging Face Transformers", "MLflow",
    "Ethical Hacking", "Penetration Testing", "OWASP", "Metasploit", "Wireshark", "Burp Suite", "Kali Linux", "Snort", "Splunk", "SIEM Tools",
    "GraphQL", "REST APIs", "Microservices", "Serverless Architecture", "WebSockets", "WebAssembly", "Three.js", "Unity", "Game Development", "Blockchain"
];

const insertSkills = async () => {
    connectDatabase();
    try {


        console.log('Connected to MongoDB');

        const skillsToInsert = techSkills.map(skill => ({ skill }));

        const result = await Skill.insertMany(skillsToInsert);
        console.log(`${result.length} skills inserted successfully`);

        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error inserting skills:', error);
    }
    finally{
        mongoose.connection.close();
    }
};

// insertSkills();
