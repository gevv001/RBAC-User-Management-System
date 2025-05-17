import express from 'express';
import AuthController from '../controllers/authController.js';
import authUser from '../middlewares/authUser.js';
import authPermissions from '../middlewares/authPermissions.js';
import { PERMISSIONS } from '../utils/permissions.js';
const authRoutes = express.Router();

authRoutes.post('/login', AuthController.login);
authRoutes.post('/invite', authUser, authPermissions(PERMISSIONS.USERS_INVITE), AuthController.invite)
authRoutes.post('/complete-registration', AuthController.completeRegistration)
authRoutes.post('/forgot-password', AuthController.forgotPassword)
authRoutes.post('/reset-password', AuthController.resetPassword);

export default authRoutes;