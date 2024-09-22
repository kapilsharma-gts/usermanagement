const en = require('./en');
const hi = require('./hi');

class Localization {
    constructor(defaultLocale = 'en') {
        this.locale = defaultLocale;
        this.supportedLocales = { en, hi };
    }

    setLocale(locale) {
        if (this.supportedLocales[locale]) {
            this.locale = locale;
        } else {
            console.log(`Locale ${locale} is not supported. Falling back to default.`);
            this.locale = 'en'; // Fallback to English
        }
    }

    t(key) {
        return this.supportedLocales[this.locale][key] || key; // Default to key if translation not found
    }
}

module.exports = new Localization();
