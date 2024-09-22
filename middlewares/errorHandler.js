const CommonError = require('../error/CommonError');
const LocalizationKeys = require('../localization/LocalizationKeys');

/**
 * Centralized error handling middleware for Express
 * @param {Error} err
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
function errorHandler(err, req, res, next) {
    if (err instanceof CommonError) {
        return res.error(err.message, err.statusCode, err.details);
    }

    const genericError = new CommonError(LocalizationKeys.INTERNAL_SERVER_ERROR, { originalError: err.message });
    return  res.error(genericError.message, genericError.statusCode, genericError.details);
}

module.exports = errorHandler;
