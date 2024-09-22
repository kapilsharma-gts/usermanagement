const LocalizationHelper = require('../helpers/LocalizationHelper');
const LocalizationKeys = require('../localization/LocalizationKeys');

const ProcedureCaller = require('../queries/ProcedureCaller'); 
const ProcedureCatalog = require('../constants/ProcedureCatalog'); // Stores procedure names
const logger = require('../utils/logger');

class UserService {
    async createUser(req, res) {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send({ message: LocalizationHelper.getLocalizedMessage(LocalizationKeys.MISSING_FIELDS) });
        }
 
        try {
            const results = await ProcedureCaller.callProcedure(ProcedureCatalog.CREATE_USER, [name, email, password]);
            if (results.isNotEmpty) {
                return res.status(201).send({ message: LocalizationHelper.getLocalizedMessage(LocalizationKeys.USER_CREATED), userId: results.insertId });
            } else {
                return res.status(400).send({ message: LocalizationHelper.getLocalizedMessage(LocalizationKeys.INVALID_REQUEST) });
            }
        } catch (error) {
        console.log(error);
            return res.status(500).send({ error: error });
        }
    }

    async getAllUsers(req, res) {
        try {
            logger.warn("GET_ALL_USERS ", req);
            const users = await ProcedureCaller.callProcedure(ProcedureCatalog.GET_ALL_USERS);
            return res.status(200).send(users);
        } catch (error) {
            logger.error("GET_ALL_USERS ", error);
            return res.status(500).send({ error: LocalizationHelper.getLocalizedMessage(LocalizationKeys.GENERAL_ERROR) });
        }
    }

    async getUserById(req, res) {
        const userId = req.params.id;

        if (!userId) {
            return res.status(400).send({ message: LocalizationHelper.getLocalizedMessage(LocalizationKeys.MISSING_FIELDS) });
        }

        try {

            const user = await ProcedureCaller.callProcedure(ProcedureCatalog.GET_USER_BY_ID, userId);
            if (user.length === 0) {
                return res.status(404).send({ message: LocalizationHelper.getLocalizedMessage(LocalizationKeys.USER_NOT_FOUND) });
            }
            return res.status(200).send(user[0]);
        } catch (error) {
            return res.status(500).send({ error: LocalizationHelper.getLocalizedMessage(LocalizationKeys.GENERAL_ERROR) });
        }
    }
}

module.exports = new UserService();
