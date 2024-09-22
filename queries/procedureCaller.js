const db = require('../config/db.config'); // Import the database connection instance
const CommonError = require('../error/CommonError');
const LocalizationKeys = require('../localization/LocalizationKeys')
class ProcedureCaller {
    // This function calls the specified stored procedure with the provided parameters
    async callProcedure(procedureName, ...params) {
        try {
            const sql = `CALL ${procedureName}(${params.map(() => '?').join(', ')})`;
            const [rows] = await db.callProcedure(sql, params); // Execute the stored procedure with params
          console.log("callProcedure results ",rows)
            return  rows;
        } catch (error) {
            if (error.errno === 1001) {
                throw new CommonError(LocalizationKeys.USER_EXISTS, { dbError: error.message });
            }
    
            // For other DB errors, throw a generic database error
            throw new CommonError(LocalizationKeys.DATABASE_ERROR, { dbError: error.message });
        
        }
    }
}

module.exports = new ProcedureCaller(); // Export an instance of ProcedureCaller
