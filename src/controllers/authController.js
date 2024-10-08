// src/controllers/authController.js
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

class AuthController {
    async register(req, res) {
        try {
            const { username, email, password } = req.body;
            console.log('Received data:', { username, email, password });
            
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log('Hashed password:', hashedPassword);

            const user = await User.create({ username, email, password: hashedPassword });
            console.log('User created:', user);

            res.redirect('/login'); // Исправлен путь для перенаправления
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            
            const user = await User.findOne({ where: { email } });

            if (!user || !(await bcrypt.compare(String(password), String(user.password)))) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
            // req.user = user;
            res.json({ token, redirectUrl: '/profile' });
        } catch (error) {
            console.error('Error logging in user:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    async newadmin(req, res) {
        try {
            console.log(req);
            console.log(req.user);
            res.redirect('/');
        } catch (error) {
            console.error('Error new admin:', error);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new AuthController();
