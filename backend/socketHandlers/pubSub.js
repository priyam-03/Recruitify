// import Redis from "ioredis";
// import dotenv from 'dotenv';
const Redis = require("ioredis")
const dotenv = require("dotenv");
dotenv.config();
const REDIS_URL = process.env.REDIS_URL;
const pub = new Redis(REDIS_URL);
const sub = new Redis(REDIS_URL);

const redisConnection = async () => {
    try {
        await pub.set('foo', 'bar');
        console.log('Redis connected successfully');
    } catch (error) {
        console.error('Redis connection error:', error);
    }
};
module.exports = {pub,sub,redisConnection}
