import jwt from 'jsonwebtoken';

export default async function authUser(req, res, next) {
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).json({ message: "Authentication Header is missing" });

    const token = authHeader.split(' ')[1];

    try {
        const info = jwt.verify(token, process.env.JWT_TOKEN)
        req.user = info;
        next()
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Token is invalid' })
    }
}