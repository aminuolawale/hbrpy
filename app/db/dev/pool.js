const pg = require("pg")
const {Pool} = pg
const dotenv = require('dotenv')
dotenv.config();

const databaseConfig = { connectionString: process.env.DATABASE_URL };
const pool = new Pool(databaseConfig);

module.exports = pool;