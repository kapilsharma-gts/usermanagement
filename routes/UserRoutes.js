const express = require('express');
const UserController = require('../controllers/user.controller');

class UserRoutes {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post('/createUser', UserController.createUser.bind(UserController));
        this.router.get('/getAllUsers', UserController.getAllUsers.bind(UserController));
        this.router.get('/getUserById', UserController.getUserById.bind(UserController));
    }
}

module.exports = new UserRoutes().router;
