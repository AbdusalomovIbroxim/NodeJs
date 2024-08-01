const Cart = require('../models/cartModel');
const CartItem = require('../models/cartItemModel');
const Product = require('../models/productModel');

class CartController {
  async addProductToCart(req, res) {
    try {
      const { productId, quantity } = req.body;
      const userId = req.user.id;

      let cart = await Cart.findOne({ where: { userId } });
      if (!cart) {
        cart = await Cart.create({ userId });
      }

      let cartItem = await CartItem.findOne({ where: { cartId: cart.id, productId } });
      if (cartItem) {
        cartItem.quantity += quantity;
        await cartItem.save();
      } else {
        await CartItem.create({ cartId: cart.id, productId, quantity });
      }

      res.status(200).send('Product added to cart');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async removeProductFromCart(req, res) {
    try {
      const { productId } = req.body;
      const userId = req.user.id; 

      const cart = await Cart.findOne({ where: { userId } });
      if (!cart) {
        return res.status(404).send('Cart not found');
      }

      
      await CartItem.destroy({ where: { cartId: cart.id, productId } });

      res.status(200).send('Product removed from cart');
    } catch (error) {
      console.error('Error removing product from cart:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async getCart(req, res) {
    try {

      const userId = req.user.id; 

       
      const cart = await Cart.findOne({ where: { userId }, include: [{ model: CartItem, as: 'items', include: [{ model: Product, as: 'product' }] }] });
      if (!cart) {
        return res.status(404).send('Cart not found');
      }

      res.status(200).json(cart);
    } catch (error) {
      console.error('Error fetching cart:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async placeOrder(req, res) {
    try {
      const userId = req.user.id;

      const cart = await Cart.findOne({ where: { userId }, include: [{ model: CartItem, as: 'items', include: [{ model: Product, as: 'product' }] }] });
      if (!cart) {
        return res.status(404).send('Cart not found');
      }

      const order = await Order.create({ userId, status: 'Pending' });
      const orderItems = cart.items.map(item => ({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.product.price
      }));

      await OrderItem.bulkCreate(orderItems);

      await CartItem.destroy({ where: { cartId: cart.id } });

      res.status(200).send('Order placed successfully');
    } catch (error) {
      console.error('Error placing order:', error);
      res.status(500).send('Internal Server Error');
    }
  }

}

module.exports = new CartController();
