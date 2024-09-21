const HeaderKeys = require('../constants/HeaderKeys');

class HeaderHelper {
    static getHeader(req, key) {
        return req.headers[HeaderKeys[key].toLowerCase()] || null; // Header keys are case-insensitive
    }
}

module.exports = HeaderHelper;
