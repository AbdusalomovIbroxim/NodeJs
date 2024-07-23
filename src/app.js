const express = require('express');
const path = require('path');
const app = express();

// Импорт маршрутов
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const pageRoutes = require('./routes/pageRoutes');

// Настройка EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Статические файлы
app.use(express.static(path.join(__dirname, '../public')));

// Основные маршруты
app.use('', authRoutes);
app.use('', productRoutes);
app.use('', userRoutes);
app.use('', pageRoutes);


module.exports = app;
