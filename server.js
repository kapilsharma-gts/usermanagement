const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const logger = require('./utils/logger'); // Import the logger
const db = require('./config/db.config');
const auth_middleware = require('./middlewares/auth.middleware');
const localeMiddleware = require('./middlewares/localeMiddleware');
const userRoutes = require('./routes/UserRoutes'); // Import your routing file

dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;


app.use(auth_middleware);
app.use(localeMiddleware); 

// Test database connection
db.checkConnection(); 

// Use body-parser to parse JSON requests
app.use(bodyParser.json());

// Route setup
app.use('/users', userRoutes);

// Start the server
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);

});
