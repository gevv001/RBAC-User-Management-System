import UserModel from "../models/userModel.js"
import bcrypt from 'bcrypt';
import { generateInviteToken, generateNewToken, generateResetToken } from "../utils/jwt.js";
import { configDotenv } from 'dotenv';
import { sendInviteEmail, sendResetPassEmail } from "../utils/email.js";
import jwt from "jsonwebtoken";
configDotenv();

class AuthServices {

    static async login(email, password) {
        if (!email || !password) {
            return {
                status: 400,
                message: "Email or password missing"
            }
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return {
                status: 400,
                message: "No such user"
            }
        }

        const passMatch = await bcrypt.compare(password, user.password)

        if (!passMatch) {
            return {
                status: 401,
                message: "Wrong password"
            }
        }

        const token = generateNewToken(user);

        return {
            status: 200,
            message: "Log in Successful",
            token,
            user: {
                email: user.email,
                fullName: user.fullName,
                phone: user.phone,
                permissions: user.permissions,
                role: user.role,
                id: user._id
            }
        }
    }

    static async invite(email, role) {
        if (!email || !role) {
            return {
                status: 400,
                message: "Email and role are required"
            }
        }

        const inviteToken = generateInviteToken(email, role)

        const link = `http://localhost:${process.env.PORT}/complete-registration?token=${inviteToken}`;

        try {
            await sendInviteEmail(email, link);

            const newUser = new UserModel({
                email,
                role,
                status: "invited"
            });

            await newUser.save();


            return {
                status: 200,
                message: "Invitation sent"
            }
        } catch (error) {
            console.error(error);

            return {
                status: 500,
                message: "Failed to send invitation link"
            }
        }
    }

    static async completeRegistration(token, password, fullName) {
        if (!token || !password || !fullName) {
            return {
                status: 400,
                message: "Missing fields"
            };
        }

        let info;

        try {
            info = jwt.verify(token, process.env.JWT_INVITE_TOKEN);
        } catch (error) {
            console.error(error);

            return {
                status: 400,
                message: "Invalid or expired token"
            };
        }

        const user = await UserModel.findOne({ email: info.email });

        if (!user || user.status !== 'invited') {
            return {
                status: 404,
                message: "No invited user found"
            };
        }

        user.password = await bcrypt.hash(password, 10);
        user.fullName = fullName;
        user.status = 'active';

        await user.save();

        return {
            status: 200,
            message: "Registration complete"
        };
    }

    static async forgotPassword(email) {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return {
                status: 404,
                message: "No such user"
            }
        }

        const resetToken = generateResetToken(email);

        const link = `http://localhost:5173/reset-password/${resetToken}`;

        try {
            await sendResetPassEmail(email, link)

            return {
                status: 200,
                message: "Password reset link sent"
            }
        } catch (error) {
            console.error(error);

            return {
                status: 500,
                message: "Failed to send password reset link"
            }
        }
    }

    static async resetPassword(token, password) {
        if (!token || !password) {
            return {
                status: 400,
                message: "Missing fields"
            }
        }

        let info;

        try {
            info = jwt.verify(token, process.env.JWT_RESET_TOKEN);
        } catch (error) {
            console.error(error);

            return {
                status: 400,
                message: "Invalid or expired token"
            };
        }

        const user = await UserModel.findOne({ email: info.email })


        if (!user || user.status == 'invited') {
            return {
                status: 404,
                message: "No user or not complete registration"
            };
        }

        const newPassword = await bcrypt.hash(password, 10);

        user.password = newPassword;

        await user.save();

        return {
            status: 200,
            message: "Password reset successful"
        };
    }

    static async changePassword(currentPassword, newPassword) {
        if (!currentPassword || !newPassword) {
            return {
                status: 400,
                message: "Missing fields"
            }
        }

        const user = await UserModel.findOne({ email: req.user.email });

        if (!user) {
            return {
                status: 404,
                message: "No such user"
            }
        }



        const passMatch = await bcrypt.compare(currentPassword, user.password);

        if (!passMatch) {
            return {
                status: 401,
                message: "Wrong current password"
            }
        }

        user.password = await bcrypt.hash(newPassword, 10);

        await user.save();

        return {
            status: 200,
            message: "Password change successful"
        }
    }
}

export default AuthServices