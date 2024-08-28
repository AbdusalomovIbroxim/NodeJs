require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const coookieParser = require('cookie-parser');
const cors = require('cors');

// Импорт маршрутов
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const pageRoutes = require('./routes/pageRoutes');
const cartRouter = require('./routes/cartRouter');
const adminRouter = require('./routes/adminRoutes');


// const clearTables = require('./services/destroyDB');

// clearTables();
// settings model
require('./models/init.models'); 


// Настройка EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(coookieParser());

// Статические файлы
app.use(express.static(path.join(__dirname, '../public'))); // styles
app.use(express.static(path.join(__dirname, 'public'))); // images
app.use('/css', express.static(path.join(__dirname, '../public/plugins/bootstrap/css')));

// Основные маршруты
app.use('', authRoutes);
app.use('', productRoutes);
app.use('', userRoutes);
app.use('', pageRoutes);
app.use('', cartRouter);
app.use('/admin', adminRouter);


app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Установите `true`, если используете HTTPS
}));

app.use(cors({
    origin: 'http://localhost:8000', // или '*' для доступа со всех доменов
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


module.exports = app;
