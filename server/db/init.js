// -- Checks and initializes required tables in database if they doesn't exist yet --
const pool = require('./database');

async function initDatabase() {
    // Users Table
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        );
    `);

    // Posts Table
    await pool.query(`
        CREATE TABLE IF NOT EXISTS posts (
            id SERIAL PRIMARY KEY,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            body TEXT NOT NULL
        );
    `);

    console.log('Database checked / initialized');
}

module.exports = initDatabase;
