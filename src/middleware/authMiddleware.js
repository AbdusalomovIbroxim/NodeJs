// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = async function authenticateToken(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        console.log('123', authHeader);

        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header missing' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token missing from header' });
        }

        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
        
    } catch (error) {
        console.error('Error during token verification:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
