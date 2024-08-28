const Order = require('../models/ordersModel');
const OrderItem = require('../models/orederItemModel');
const Category = require('../models/categoryModel');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const ProductImage = require('../models/imageModel');

class AdminController {
    async openAdminPanel(req, res) {
        try {
            res.render('admin/index');
        } catch (error) {
            console.error('Error fetching orders:', error);
            res.status(500).send('Server Error');
        }
    }

    async getAllOrders(req, res) {
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

    async createCategory(req, res) {
        try {
            const { name } = req.body;
            console.log(req);
            
            if (name) {
                await Category.create({ name });
            }

            const categories = await Category.findAll();
            res.status(200).json(categories);
        } catch (error) {
            console.error('Error creating category:', error);
            res.status(500).send('Server Error');
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ message: 'Server Error' });
        }
    }

    async updateUserStatus(req, res) {
        try {
            console.log(req.body);
            
            const { userId, status } = req.body;
            if (status === 'true') {
                await User.update({ isAdmin: true }, { where: { id: userId } });
            } else if (status === 'false') {
                await User.update({ isAdmin: false }, { where: { id: userId } });
            }
            
            res.status(200).send('User status updated');
        } catch (error) {
            console.error('Error updating user status:', error);
            res.status(500).send('Server Error');
        }
    }

    async getAllProducts(req, res) {
        try {
            const products = await Product.findAll({
                include: [{ model: ProductImage, as: 'images'  }]
            });
            res.json(products);
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ error: 'Error fetching products' });
        }
    }
    

    async createProduct(req, res) {
        try {
            const { name, price, image } = req.body;
            if (!name || !price) {
                return res.status(400).json({ error: 'Name and price are required' });
            }

            const newProduct = await Product.create({ name, price, image });
            res.status(201).json(newProduct);
        } catch (error) {
            console.error('Error creating product:', error);
            res.status(500).json({ error: 'Error creating product' });
        }
    }
}

module.exports = new AdminController();
