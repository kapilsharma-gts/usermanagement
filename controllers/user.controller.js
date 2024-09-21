const userService = require('../services/UserService');
const HeaderHelper = require('../helpers/HeaderHelper');
const HeaderKeys = require('../constants/HeaderKeys');

class UserController {
    async createUser(req, res) {
        await userService.createUser(req, res);
    }

    async getAllUsers(req, res) {
        await userService.getAllUsers(req, res);
    }

    async getUserById(req, res) {
        await userService.getUserById(req, res);
    }
}

module.exports = new UserController();
