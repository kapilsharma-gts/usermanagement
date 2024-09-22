const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./config/db.config');
const auth_middleware = require('./middlewares/auth.middleware');
const localeMiddleware = require('./middlewares/localeMiddleware');
const userRoutes = require('./routes/UserRoutes'); // Import your routing file
const ProcedureCaller = require('./prototypes/HelperPrototype'); 

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
    console.log(`Server is running on port ${PORT}`);

});