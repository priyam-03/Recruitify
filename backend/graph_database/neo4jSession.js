const neo4j = require('neo4j-driver');
require("dotenv").config({ path: "../secret.env" });

USER_NAME = process.env.NEO4J_USER;
PASSWORD = process.env.NEO4J_PASSWORD;
NEO4J_URI = process.env.NEO4J_URI;
const func = () =>{
    if(!USER_NAME||!PASSWORD||!NEO4J_URI){
        console.log('Please provide the required environment variables');
        process.exit(1);
    }
}
func();
const driver = neo4j.driver(
   NEO4J_URI,
   neo4j.auth.basic(USER_NAME, PASSWORD)
);

module.exports = driver;