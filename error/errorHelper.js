const LocalizationHelper = require('../helpers/LocalizationHelper');
const CommonError = require('../error/CommonError');


function handleError(res, error) {
    if (error instanceof CommonError) {
        return res.error(
            LocalizationHelper.getLocalizedMessage(error.message),
            error.statusCode,
            error.details || null
        );
    }

    return res.error(
        LocalizationHelper.getLocalizedMessage(LocalizationKeys.GENERAL_ERROR),
        500,
        { error: error.message || 'Unknown error' } 
    );
}

module.exports = { handleError };
