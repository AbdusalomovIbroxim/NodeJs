// src/controllers/UserController.js
const User = require('../models/userModel'); // Импорт модели User

class UserController {
    async getUserProfile(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).render('error', { message: 'User not found' });
            }

            res.render('userProfile', { user });
        } catch (error) {
            console.error('Error fetching user profile:', error);
            res.status(500).render('error', { message: 'Internal server error' });
        }
    }
}

module.exports = UserController;
