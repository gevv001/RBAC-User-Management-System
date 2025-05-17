import { ROLE_PERMISSIONS } from '../utils/permissions.js';

export default function authPermissions(requiredPermission) {
    return (req, res, next) => {
        const user = req.user;
        
        if (!user) return res.status(401).json({ message: 'Not authenticated' });

        const allowed = (ROLE_PERMISSIONS[user.role] || []).includes(requiredPermission);
        if (!allowed) return res.status(403).json({ message: 'Forbidden' });

        next();
    };
}
