const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');

// Импорт маршрутов
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const pageRoutes = require('./routes/pageRoutes');


// settings model
require('./models/init.models'); 


// Настройка EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Статические файлы
app.use(express.static(path.join(__dirname, '../public'))); // styles
app.use(express.static(path.join(__dirname, 'public'))); // images

// Основные маршруты
app.use('', authRoutes);
app.use('', productRoutes);
app.use('', userRoutes);
app.use('', pageRoutes);


app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Установите `true`, если используете HTTPS
}));

module.exports = app;
