const Image = require('../models/imageModel');
const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const urls = require('../config/urls');




class ProductController {
    async getAddProductPage(req, res) {
        res.render('product/add-product', { urls });
    }

      
    async addProduct(req, res) {
        try {
            console.log(req.body);
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
            const categories = await Category.findAll();
            res.render('product/product-list', { products, urls, categories });
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
        // const { page = 1, price_min, price_max, sort, category } = req.query;
        //     const limit = 10;
        //     const offset = (page - 1) * limit;

        //     // Получение категорий для модального окна
        //     const categories = await Category.findAll();

        //     // Фильтрация и сортировка продуктов
        //     const where = {};
        //     if (category) {
        //         where.categoryId = category;
        //     }
        //     if (price_min) {
        //         where.price = { [Op.gte]: price_min };
        //     }
        //     if (price_max) {
        //         where.price = { [Op.lte]: price_max };
        //     }

        //     const order = [];
        //     if (sort === 'price_asc') {
        //         order.push(['price', 'ASC']);
        //     } else if (sort === 'price_desc') {
        //         order.push(['price', 'DESC']);
        //     } else if (sort === 'name_asc') {
        //         order.push(['name', 'ASC']);
        //     } else if (sort === 'name_desc') {
        //         order.push(['name', 'DESC']);
        //     }

        //     const products = await Product.findAll({
        //         where,
        //         order,
        //         limit,
        //         offset
        //     });

        //     const totalProducts = await Product.count({ where });
        //     const totalPages = Math.ceil(totalProducts / limit);

        //     // Используйте пустой массив по умолчанию для recentProducts
        //     const recentProducts = req.session.recentProducts || [];

        //     res.render('product/product-list', {
        //         products,
        //         categories,
        //         currentPage: parseInt(page, 10),
        //         totalPages,
        //         recentProducts
        //     });
        // } catch (error) {
        //     console.error(error);
        //     res.status(500).send('Server Error');
        // }
    }


    async getProductDetail(req, res) {
        try {
            const { slug } = req.params;
            const product = await Product.findOne({ where: { slug } });
            if (!product) {
                return res.status(404).send('Product Not Found');
            }
            const images = await Image.findAll({ where: { productId: product.id } });
            res.render('product/product-detail', { product, images });
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    }
    
}

module.exports = new ProductController;
