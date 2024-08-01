// src/controllers/userController.js
const User = require('../models/userModel');
const { use } = require('../routes/userRoutes');


class UserController {
    async getUserProfile(req, res) {
        try {
            // console.log(req.headers);
            const user = req.user;
            if (!user) {
                return res.status(401).json({message: 'Вы не прошли авторизацию'});
            }

            const userData = await User.findOne({ where: { email: user.email } });

            // console.log(userData);
            const profile = {
                username: userData.username,
                email: userData.email,
            }

            if (profile) {
                return res.status(200).json(profile);
            }


            // if (!req.user || !req.user.id) {
            //     return res.status(401).json({ message: 'User not authenticated' });
            // }

            // const user = await User.findByPk(req.user.id);
            // if (!user) {
            //     return res.status(404).json({ message: 'User not found' });
            // }

            res.render('user/userProfile');
        } catch (error) {
            console.error('Error fetching user profile:', error);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new UserController();
``