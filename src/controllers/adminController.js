const Order = require('../models/ordersModel');
const OrderItem = require('../models/orederItemModel');
const Category = require('../models/categoryModel');
const User = require('../models/userModel');
const Product = require('../models/productModel');

async function openAdminPanel(req, res) {
    try {
        res.render('admin/index');
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).send('Server Error');
    }
}

async function getAllOrders(req, res) {
    try {
        const orderItems = await OrderItem.findAll({
            include: [{ model: Product }],
        });
    
        res.json(orderItems);
      } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Error fetching orders' });
      }
}

async function createCategory(req, res) {
    try {
        const { name } = req.body;
        console.log(req);
        
        const categories = await Category.findAll();
        if (name) {
            await Category.create({ name });
        }

        // res.render('admin/index', { categories });
        res.status(200).json(categories);
        // res.status(500).json({ error: 'Server Error' });
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).send('Server Error');
    }
}

async function getUsers(req, res) {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server Error' });
    }
}


async function updateUserStatus(req, res) {
    try {
        console.log(req.body);
        
        const { userId, status } = req.body;
        const user = await User.update({ isAdmin: status }, { where: { id: userId } });
        // res.redirect('/admin');
        console.log(user);
        
        res.status(200);

    } catch (error) {
        console.error('Error updating user status:', error);
        res.status(500).send('Server Error');
    }
}


async function meadmin(req, res) {
    try {
        console.log(req.user);
        const userId = req.user.id;
        await User.update(
            { isAdmin: true }, // Обновляем поле isAdmin на true
            { where: { id: userId } } // Указываем условие для обновления
        );
        res.redirect('/admin');
    } catch (error) {
        console.error('Error creating admin status:', error);
        res.status(500).send('Server Error');
    }
}


module.exports = {
    openAdminPanel,
    getAllOrders,
    createCategory,
    getUsers,
    updateUserStatus,
    meadmin,
};
