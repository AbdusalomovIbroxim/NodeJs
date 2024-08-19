const Cart = require('../models/cartModel');
const CartItem = require('../models/cartItemModel');
const Product = require('../models/productModel');
const Orders = require('../models/ordersModel');
const OrderItem = require('../models/orederItemModel');


class CartController {
    async addProductToCart(req, res) {
        try {
            
            const { productId, quantity } = req.body;
            const userId = req.user['id'];

            let cart = await Cart.findOne({ where: { userId } });
            if (!cart) {
                cart = await Cart.create({ userId });
            }

            const cartId = cart.dataValues.id


            const [cartItem, created] = await CartItem.findOrCreate({
                // attributes: {
                    // exclude: [''],
                // },
                where: { productId, cartId },
                defaults: { quantity }
            });

            if (!created) {
                cartItem.quantity += quantity;
                await cartItem.save();
            }

            res.status(200).json({ message: 'Product added to cart', cart });
        } catch (error) {
            console.error('Error adding product to cart:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async removeProductFromCart(req, res) {
        try {
            const { userId, productId } = req.body;

            const cart = await Cart.findOne({ where: { userId } });
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }

            await CartItem.destroy({ where: { cartId: cart.id, productId } });

            res.status(200).json({ message: 'Product removed from cart' });
        } catch (error) {
            console.error('Error removing product from cart:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async viewCart(req, res) {
        try {
            const userId = req.user['id'];
            
            const cart = await Cart.findOne({ where: { userId: userId } });
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }
            
            const items = await CartItem.findAll({
                where: { cartId: cart['id'] },
                attributes: {
                    exclude: ['userId'],

                },
                include: [{ model: Product }],
                order: [['createdAt', 'ASC']]
            });


            // const productIds = [...new Set(items.map(item => item.productId))];

            // const products = await Product.findAll({
            //     where: {
            //         id: productIds
            //     }
            // });

            // const productMap = new Map(products.map(product => [product.id, product]));

            // const itemsWithProducts = items.map(item => ({
            //     ...item,
            //     product: productMap.get(item.productId)
            // }));


            res.status(200).json({ cart, items });
        } catch (error) {
            console.error('Error viewing cart:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    
    // async placeOrder(req, res) {
    //     try {
    //         const { userId, productIds } = req.body;

    //         const cart = await Cart.findOne({ where: { userId } });
    //         if (!cart) {
    //             return res.status(404).json({ message: 'Cart not found' });
    //         }

    //         const cartItems = await CartItem.findAll({
    //             where: { cartId: cart.id, productId: productIds },
    //             include: Product
    //         });

    //         if (cartItems.length === 0) {
    //             return res.status(400).json({ message: 'No items found for order' });
    //         }

    //         await CartItem.destroy({ where: { cartId: cart.id, productId: productIds } });

    //         res.status(200).json({ message: 'Order placed successfully' });
    //     } catch (error) {
    //         console.error('Error placing order:', error);
    //         res.status(500).json({ message: 'Internal server error' });
    //     }
    // }


    async placeOrder(req, res) {
        try {
            const { productIds } = req.body;
            const userId = req.user['id'];
    
            if (!Array.isArray(productIds) || productIds.length === 0) {
                return res.status(400).json({ message: 'Invalid or empty product IDs' });
            }
    
            let order = await Orders.findOne({ where: { userId, status: 'pending' } });
    
            if (!order) {
                order = await Orders.create({
                    userId,
                    status: 'pending'
                });
            }
    
            const cart = await Cart.findOne({ where: { userId } });
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }
    
            const cartItems = await CartItem.findAll({
                where: { cartId: cart.id, productId: productIds },
                include: [{ model: Product }]
            });
    
            if (cartItems.length === 0) {
                return res.status(400).json({ message: 'No items found for the provided product IDs' });
            }
    
            const orderItems = cartItems.map(item => ({
                orderId: order.id,
                productId: item.productId,
                quantity: item.quantity,
            }));

            console.log(orderItems);
            
            await OrderItem.bulkCreate(orderItems);
    
            await CartItem.destroy({ where: { cartId: cart.id, productId: productIds } });
    
            res.status(200).json({ message: 'Order placed successfully', order });
        } catch (error) {
            console.error('Error placing order:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    
    
    
}

module.exports = new CartController();
