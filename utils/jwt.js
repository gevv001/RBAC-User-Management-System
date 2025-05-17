import jwt from 'jsonwebtoken';

export function generateNewToken(user) {
    return jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_TOKEN,
        { expiresIn: '24h' }
    );
}

export function generateInviteToken(email, role) {
    return jwt.sign(
        { email, role },
        process.env.JWT_INVITE_TOKEN,
        { expiresIn: '24h' }
    );
}

export function generateResetToken(email) {
    return jwt.sign(
        { email },
        process.env.JWT_RESET_TOKEN,
        { expiresIn: '15m' }
    )
}
