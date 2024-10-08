// middlewares/auth.middleware.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const HeaderKeys = require('../constants/HeaderKeys');

dotenv.config();

const authMiddleware = (req, res, next) => {
    const token = req.headers[HeaderKeys.AUTHORIZATION];

    // if (!token) {
    //     return res.status(403).send({ message: 'No token provided.' });
    // }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        // if (err) {
        //     return res.status(401).send({ message: 'Unauthorized!' });
        // }
        // req.userId = decoded.id;
        next();
    });
};

module.exports = authMiddleware;
