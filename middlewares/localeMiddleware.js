const Localization = require('../localization');
const HeaderHelper = require('../helpers/HeaderHelper');
const HeaderKeys = require('../constants/HeaderKeys');

module.exports = (req, res, next) => {
    const locale = HeaderHelper.getHeader(req, 'ACCEPT_LANGUAGE') || 'en'; // Get locale from headers or default to English
    Localization.setLocale(locale); // Set the locale dynamically for this request
    next(); // Pass control to the next handler
};
