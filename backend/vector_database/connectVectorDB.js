const {Index} = require('@upstash/vector');
require("dotenv").config({ path: "../secret.env" });

const index = new Index({
    url: process.env.VECDB_URI,
    token: process.env.VECDB_TOKEN
});

module.exports = { index };
