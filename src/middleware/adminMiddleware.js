const User = require('../models/userModel');

module.exports = async function checkAdmin(req, res, next) {
    try {
        // Проверка, есть ли объект пользователя в запросе
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const user = await User.findByPk(req.user['id']);
        // Проверка, является ли пользователь администратором
        
        if (!user.isAdmin) {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }

        // Если пользователь администратор, пропускаем его дальше
        next();

    } catch (error) {
        console.error('Error checking admin status:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
