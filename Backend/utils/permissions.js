export const ROLES = {
    ADMIN: 'admin',
    USER: 'user',
};

export const PERMISSIONS = {
    USERS_READ: 'users:read',
    USERS_UPDATE: 'users:update',
    USERS_PERM_UPDATE: 'users:permissions',
    USERS_INVITE: 'users:invite'
};

export const ROLE_PERMISSIONS = {
    [ROLES.ADMIN]: [
        PERMISSIONS.USERS_READ,
        PERMISSIONS.USERS_UPDATE,
        PERMISSIONS.USERS_PERM_UPDATE,
        PERMISSIONS.USERS_INVITE,
    ],
    [ROLES.USER]: [
        PERMISSIONS.USERS_READ,
    ],
};
