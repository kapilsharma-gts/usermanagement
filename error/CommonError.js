
const LocalizationHelper = require('../helpers/LocalizationHelper');
const LocalizationKeys = require('../localization/LocalizationKeys');

class CommonError extends Error {
    constructor(key, details = null) {
        super();
        const errorInfo = CommonError.getErrorInfo(key);

        this.name = this.constructor.name;
        this.message = errorInfo.message;
        this.statusCode = errorInfo.statusCode;
        this.code = errorInfo.code;
        this.details = details; 
    }

    /**
     * Get the error info (message, statusCode, code) using LocalizationHelper.
     * @param {string} key - The key from LocalizationKeys.
     * @returns {Object} - Object containing the message, statusCode, and code.
     */
    static getErrorInfo(key) {
        const defaultError = {
            message: LocalizationHelper.getLocalizedMessage(LocalizationKeys.GENERAL_ERROR),
            statusCode: 500,
            code: 1000
        };

        const errorMap = {
            USER_EXISTS: {
                message: LocalizationHelper.getLocalizedMessage(LocalizationKeys.USER_EXISTS),
                code: 1001,
                statusCode: 400
            },
            DATABASE_ERROR: {
                message: LocalizationHelper.getLocalizedMessage(LocalizationKeys.DATABASE_ERROR),
                code: 1002,
                statusCode: 500
            },
            NOT_FOUND: {
                message: LocalizationHelper.getLocalizedMessage(LocalizationKeys.NOT_FOUND),
                code: 1003,
                statusCode: 404
            },
            INTERNAL_SERVER_ERROR: {
                message: LocalizationHelper.getLocalizedMessage(LocalizationKeys.INTERNAL_SERVER_ERROR),
                code: 1004,
                statusCode: 500
            },
            USER_CREATED: {
                message: LocalizationHelper.getLocalizedMessage(LocalizationKeys.USER_CREATED),
                statusCode: 201,
                code: 1005
            },
            USER_NOT_FOUND: {
                message: LocalizationHelper.getLocalizedMessage(LocalizationKeys.USER_NOT_FOUND),
                statusCode: 404,
                code: 1006
            },
            MISSING_FIELDS: {
                message: LocalizationHelper.getLocalizedMessage(LocalizationKeys.MISSING_FIELDS),
                statusCode: 400,
                code: 1007
            },
            INVALID_REQUEST: {
                message: LocalizationHelper.getLocalizedMessage(LocalizationKeys.INVALID_REQUEST),
                statusCode: 400,
                code: 1008
            },
            GENERAL_ERROR: {
                message: LocalizationHelper.getLocalizedMessage(LocalizationKeys.GENERAL_ERROR),
                statusCode: 500,
                code: 1009
            },
            INVALID_EMAIL: {
                message: LocalizationHelper.getLocalizedMessage(LocalizationKeys.INVALID_EMAIL),
                statusCode: 400,
                code: 1010
            },
            WEAK_PASSWORD: {
                message: LocalizationHelper.getLocalizedMessage(LocalizationKeys.WEAK_PASSWORD),
                statusCode: 400,
                code: 1011
            }
        };

        return errorMap[key] || defaultError;
    }
}

module.exports = CommonError;