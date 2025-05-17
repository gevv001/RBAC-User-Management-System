import UserServices from "../services/usersServices.js";
import { secureUpdateData } from "../services/userUtils.js";
import { sendJson } from "../utils/response.js";

class UsersController {
    static async getPaginatedUsers(req, res) {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10

        const response = await UserServices.getPaginatedUsers(page, limit);

        return sendJson(res, response)
    }

    static async getMe(req, res) {
        const { id } = req.user;

        const response = await UserServices.getUser(id);

        return sendJson(res, response)
    }

    static async updateMe(req, res) {
        const { id } = req.user;

        const updateData = secureUpdateData(req.body);
        delete updateData.email

        const response = await UserServices.updateUser(id, updateData);

        return sendJson(res, response)
    }

    static async getUser(req, res) {
        const { id } = req.params;

        const response = await UserServices.getUser(id);

        return sendJson(res, response)
    }

    static async updateUser(req, res) {
        const { id } = req.params;

        const updateData = secureUpdateData(req.body);

        const response = await UserServices.updateUser(id, updateData);

        return sendJson(res, response)
    }

    static async updateRole(req, res) {
        const { id } = req.params;
        const { role } = req.body;

        const response = await UserServices.updateRole(id, role);

        return sendJson(res, response)
    }

    static async deleteUser(req, res) {
        const { id } = req.params;

        const response = await UserServices.deleteUser(id);

        return sendJson(res, response)
    }
}

export default UsersController;