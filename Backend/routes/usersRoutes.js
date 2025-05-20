import express from 'express';
import authUser from '../middlewares/authUser.js';
import UsersController from '../controllers/usersController.js';
import authPermissions from '../middlewares/authPermissions.js';
import { PERMISSIONS } from '../utils/permissions.js';

const usersRoutes = express.Router();

usersRoutes.get('/', authUser, UsersController.getPaginatedUsers)
usersRoutes.get('/me', authUser, UsersController.getMe)
usersRoutes.patch('/me', authUser, UsersController.updateMe)
usersRoutes.get('/:id', authUser, authPermissions(PERMISSIONS.USERS_READ), UsersController.getUser)
usersRoutes.patch('/:id', authUser, authPermissions(PERMISSIONS.USERS_UPDATE), UsersController.updateUser)
usersRoutes.patch('/:id/role', authUser, authPermissions(PERMISSIONS.USERS_PERM_UPDATE), UsersController.updateRole)
usersRoutes.delete('/:id', authUser, authPermissions(PERMISSIONS.USERS_UPDATE), UsersController.deleteUser)

export default usersRoutes