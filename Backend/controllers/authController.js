import AuthServices from "../services/authServices.js";

class AuthController {
    static async invite(req, res) {
        const { email, role } = req.body

        const response = await AuthServices.invite(email, role);

        res.status(response.status).json({ 
            message: response.message 
        })
    }

    static async login(req, res) {
        const { email, password } = req.body

        const response = await AuthServices.login(email, password);

        res.status(response.status).json({
            message: response.message,
            token: response.token,
            user: response.user
        })
    }

    static async completeRegistration(req, res) {
        const { token, password, fullName } = req.body

        const response = await AuthServices.completeRegistration(token, password, fullName);

        res.status(response.status).json({ 
            message: response.message 
        })
    }

    static async forgotPassword(req, res) {
        const { email } = req.body;

        const response = await AuthServices.forgotPassword(email);

        res.status(response.status).json({ 
            message: response.message 
        })
    }

    static async resetPassword(req, res) {
        const {token, password} = req.body;

        const response = await AuthServices.resetPassword(token, password);

        res.status(response.status).json({ 
            message: response.message 
        })
    }
}

export default AuthController;