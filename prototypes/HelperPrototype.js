
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

if (!Array.prototype.hasOwnProperty('first')) {
    Object.defineProperty(Array.prototype, 'first', {
        get: function() {
            return this.isNotEmpty ? this[0] : undefined;
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


Object.prototype.success = function(data = {}, message = 'Success', statusCode = 200) {
    return this.status(statusCode).json({
        success: true,
        message,
        data
    });
};

Object.prototype.error = function (message = 'An error occurred', statusCode = 500, errors = null) {
    const response = {
        success: false,
        message
    };

    if (errors) {
        response.errors = errors;
    }

    return this.status(statusCode).json(response);
};
