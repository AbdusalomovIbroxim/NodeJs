const Image = require('../models/imageModel');
const Product = require('../models/productModel');

class ProductController {
    async getAddProductPage(req, res) {
        res.render('add-product');
    }

    async addProduct(req, res) {
        try {
            const { name, price, description } = req.body;
            let images = [];

            if (req.files && req.files.length > 0) {
                images = req.files.map(file => ({
                    url: '/images/products/' + file.filename,
                    altText: file.originalname
                }));
            }

            const product = await Product.create({ name, price, description });
            await product.addProductImages(images);

            res.redirect(`/product/${product.slug}`);
        } catch (error) {
            console.error('Error adding product:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    async getAllProducts(req, res) {
        try {
            const products = await Product.findAll();
            res.render('product-list', { products });
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    }

    async getProductDetail(req, res) {
        try {
            const { slug } = req.params; // Извлекаем slug из параметров запроса
            const product = await Product.findOne({ where: { slug } }); // Ищем продукт по slug
            if (!product) {
                return res.status(404).send('Product Not Found');
            }
            const images = await Image.findAll({ where: { productId: product.id } }); // Ищем изображения по productId
            res.render('product-detail', { product, images });
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    }
    
}

module.exports = new ProductController;
