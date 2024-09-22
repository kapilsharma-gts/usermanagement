
Array.prototype.validateRequiredFields = function() {

    const missingFields = this.filter(field => !field.value);
    if (missingFields.length > 0) {
        return {
            valid: false,
            missingFields: missingFields.map(field => field.name)
        };
    }
    return { valid: true };
};
if (!Array.prototype.hasOwnProperty('isEmpty')) {
    Object.defineProperty(Array.prototype, 'isEmpty', {
        get: function() {
            return this.length === 0;
        },
        configurable: true,
        enumerable: false
    });
}
if (!Array.prototype.hasOwnProperty('isNotEmpty')) {
    Object.defineProperty(Array.prototype, 'isNotEmpty', {
        get: function() {
            return this.length > 0;
        },
        configurable: true,
        enumerable: false
    });
}
String.prototype.isValidEmail = function() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this)) {
        return ValidationMessages.INVALID_EMAIL; // Return the validation message key
    }
    return null;
};
String.prototype.isValidPassword = function() {
    if (this.length < 8) {
        return ValidationMessages.WEAK_PASSWORD;
    }
    return null;
};

Object.prototype.isEmpty = function() {
    if (Array.isArray(this)) {
        return this.length === 0;
    } else {
        return false;
    }
};

Array.prototype.first = function() {
      return this.isNotEmpty() ? this[0] : undefined;
};

