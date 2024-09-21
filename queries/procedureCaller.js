const db = require('../config/db.config'); 

class ProcedureCaller {
    async callProcedure(procedureName, ...params) {
        try {
            const sql = `CALL ${procedureName}(${params.map(() => '?').join(', ')})`;
            const [results] = await db.callProcedure(sql, params);
            return results;
        } catch (error) {
            throw new Error(`Error executing procedure ${procedureName}: ${error.message}`);
        }
    }
}

module.exports = new ProcedureCaller();
