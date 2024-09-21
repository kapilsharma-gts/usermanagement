const Localization = require('../localization');
const LocalizationKeys = require('../localization/LocalizationKeys');

class LocalizationHelper {
    static getLocalizedMessage(key) {
        return Localization.t(LocalizationKeys[key]) || key;
    }
}

module.exports = LocalizationHelper;
