const mysql = require('mysql2/promise'); // Use promise-based API
const dotenv = require('dotenv');
dotenv.config();

class Database {
    constructor() {
        this.pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
        });
    }

    // Method to call a stored procedure
    async callProcedure(procedureName, params) {
        const connection = await this.pool.getConnection(); // Get a connection from the pool
        try {
            const [results] = await connection.query(procedureName, params);
            return results; // Return results
        } catch (err) {
            throw err; // Rethrow the error
        } finally {
            connection.release(); // Release the connection back to the pool
        }
    }

    // Method to check if the database is connected
    async checkConnection() {
        try {
            const connection = await this.pool.getConnection();
            console.log('Database connected successfully');
            connection.release(); // Release the connection back to the pool
        } catch (err) {
            console.error('Database connection failed:', err.message,err);
        }
    }

    // Method to close all connections
    async close() {
        await this.pool.end(); // Close all connections in the pool
        console.log('Database connection pool closed');
    }
}

module.exports = new Database(); // Export an instance of the Database class
