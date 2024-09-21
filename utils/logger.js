const { createLogger, transports, format } = require('winston');
const { combine, timestamp, printf, colorize } = format;

// Define a custom log format
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

// Create the logger
const logger = createLogger({
    level: 'info', // You can set different levels such as 'info', 'warn', 'error'
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        colorize(), // Colorize logs for the console
        logFormat // Use the custom format
    ),
    transports: [
        new transports.Console(), // Log to the console
        new transports.File({ filename: 'logs/app.log', level: 'info' }), // Log to a file
        new transports.File({ filename: 'logs/error.log', level: 'error' }) // Log errors to a separate file
    ]
});

module.exports = logger;
