const db = require('../config/db.config'); // Import the database connection instance
const logger = require('../utils/logger');

class ProcedureCaller {
    // This function calls the specified stored procedure with the provided parameters
    async callProcedure(procedureName, ...params) {
        try {
            const sql = `CALL ${procedureName}(${params.map(() => '?').join(', ')})`;
            const [rows] = await db.callProcedure(sql, params); // Execute the stored procedure with params
          console.log("callProcedure results ",rows)
            return  rows;
        } catch (error) {
            throw new Error(`Error executing procedure ${procedureName}: ${error.message}`);
        }
    }
}

module.exports = new ProcedureCaller(); // Export an instance of ProcedureCaller
