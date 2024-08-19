const Product = require('../models/productModel');
const ProductImage = require('../models/imageModel');

class PageController {
        async getHomePage(req, res) {
            try {
                const products = await Product.findAll({
                    order: [['createdAt', 'DESC']],
                    limit: 15,
                    include: {
                        model: ProductImage,
                        as: 'images',
                        attributes: ['url'],
                        limit: 1,
                    },
                    order: [['createdAt', 'ASC']],
                });

                const formattedProducts = products.map(product => {
                    const image = product.images[0];
                    return {
                        ...product.toJSON(),
                        imageUrl: image ? image.url : 'https://via.placeholder.com/300'
                    };
                });

                res.render('pages/homePage', { products: formattedProducts });
            } catch (error) {
                console.error('Error fetching products:', error);
                res.status(500).send('Internal Server Error');
            }
        }

      

    getAboutUsPage(req, res) {
        res.render('pages/aboutUs');
    }

    getContactPage(req, res) {
        res.render('pages/contact');
    }

    getFAQPage(req, res) {
        res.render('pages/faq');
    }

    async postFAQPage(req, res) {
        
    }
}

module.exports = new PageController;
