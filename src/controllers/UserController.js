const User = require('../models/userModel');

class UserController {
    async getUserProfile(req, res) {
        try {
            const user = await User.findByPk(req.user.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.render('user/userProfile', { user });
        } catch (error) {
            console.error('Error fetching user profile:', error);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new UserController();
