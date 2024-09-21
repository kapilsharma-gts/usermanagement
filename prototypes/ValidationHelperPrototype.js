
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

