import AuthServices from "../services/authServices.js";
import { sendJson } from "../utils/response.js";

class AuthController {
    static async invite(req, res) {
        const { email, role } = req.body

        const response = await AuthServices.invite(email, role);

        return sendJson(res, response)

    }

    static async login(req, res) {
        const { email, password } = req.body

        const response = await AuthServices.login(email, password);

        return sendJson(res, response)

    }

    static async completeRegistration(req, res) {
        const { token, password, fullName } = req.body

        const response = await AuthServices.completeRegistration(token, password, fullName);

        return sendJson(res, response)

    }

    static async forgotPassword(req, res) {
        const { email } = req.body;

        const response = await AuthServices.forgotPassword(email);

        return sendJson(res, response)

    }

    static async resetPassword(req, res) {
        const { password } = req.body;
        const { token } = req.params;

        const response = await AuthServices.resetPassword(token, password);

        return sendJson(res, response)

    }

    static async changePassword(req, res) {
        const { currentPassword, newPassword } = req.body;
        const { email } = req.user

        const response = await AuthServices.changePassword(email, currentPassword, newPassword);

        return sendJson(res, response)
    }
}

export default AuthController;