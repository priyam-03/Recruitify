// import Redis from "ioredis";
// import dotenv from 'dotenv';
// require("dotenv").config();
require("dotenv").config({ path: "./secret.env" });
const Redis = require("ioredis");

// const connectPubSub = () => {
const REDIS_URL = process.env.REDIS_URL;
console.log("REDIS_URL" + REDIS_URL);
const pub = new Redis(REDIS_URL);
const sub = new Redis(REDIS_URL);
// return { pub, sub };
// };

const redisConnection = async () => {
  try {
    await pub.set("foo", "bar");
    console.log("Redis connected successfully");
  } catch (error) {
    console.error("Redis connection error:", error);
  }
};
module.exports = { pub, sub, redisConnection };
