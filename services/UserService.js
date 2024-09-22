const LocalizationHelper = require('../helpers/LocalizationHelper');
const LocalizationKeys = require('../localization/LocalizationKeys');
const ProcedureCaller = require('../queries/ProcedureCaller'); 
const ProcedureCatalog = require('../constants/ProcedureCatalog'); // Stores procedure names
const { handleError } = require('../error/errorHelper');
class UserService {
    async createUser(req, res) {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send({ message: LocalizationHelper.getLocalizedMessage(LocalizationKeys.MISSING_FIELDS) });
        }
 
        try {
            const results = await ProcedureCaller.callProcedure(ProcedureCatalog.CREATE_USER, [name, email, password]);
           if (results.isNotEmpty) {
                return res.success(
                    { userId: results.insertId }, // Pass the data only
                    LocalizationHelper.getLocalizedMessage(LocalizationKeys.USER_CREATED), // Success message
                    200 // Status code
                );
            } else {
                return res.error(
                    LocalizationHelper.getLocalizedMessage(LocalizationKeys.INVALID_REQUEST), // Error message
                    400 // Status code
                );
            }
        } catch (error) {
            handleError(res, error);

        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await ProcedureCaller.callProcedure(ProcedureCatalog.GET_ALL_USERS);
            return res.status(200).send(users);
        } catch (error) {
            handleError(res, error);
        }
    }

    async getUserById(req, res) {
        const userId = req.body.id;

        if (!userId) {
            return res.status(400).send({ message: LocalizationHelper.getLocalizedMessage(LocalizationKeys.MISSING_FIELDS) });
        }
        console.log("user id ", userId);
        
        try {
            const user = await ProcedureCaller.callProcedure(ProcedureCatalog.GET_USER_BY_ID, userId);
            if (user.isEmpty) {
                return res.status(404).send({ message: LocalizationHelper.getLocalizedMessage(LocalizationKeys.USER_NOT_FOUND) });
            }
            return res.status(200).send(user.first);
        } catch (error) {
            handleError(res, error);
        }
    }
}

module.exports = new UserService();
