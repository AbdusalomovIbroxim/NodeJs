const { Op } = require('sequelize');
const ProductImage = require('../models/imageModel');
const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const urls = require('../config/urls');
const { useInflection } = require('sequelize');




class ProductController {
    async getAddProductPage(req, res) {
        // const categories = await Category.findAll();
        res.render('product/add-product', { urls });
    }

      
    async addProduct(req, res) {
        try {
          const { name, price, description, categories } = req.body;
          let images = [];
          console.log(req.body);
          
      
          // Проверяем наличие файлов в запросе
          if (req.files && req.files.length > 0) {
            images = req.files.map(file => ({
              url: '/images/products/' + file.filename,
              altText: file.originalname
            }));
          }
      
          // Создаем продукт
          const product = await Product.create({ name, price, description });
      
          // Добавляем изображения к продукту
          if (images.length > 0) {
            await product.addProductImages(images);
          }
      
          // Ассоциируем категории с продуктом
          if (categories && categories.length > 0) {
            await product.addCategories(categories); // Предполагается, что `addCategories` — это метод для ассоциации категорий
          }
      
          res.redirect(`/product/${product.slug}`);
        } catch (error) {
          console.error('Error adding product:', error);
          res.status(500).send('Internal Server Error');
        }
      }


      async getAllProducts(req, res) {
        try {
            const { search, category, price_min, price_max, sort } = req.query;
            console.log(req.query);
    
            const whereConditions = {};
    
            // Фильтрация по названию
            if (search) {
                whereConditions.name = {
                    [Op.iLike]: `%${search}%`
                };
            }
    
            // Фильтрация по категории
            if (category) {
                whereConditions.categoryId = category; // Предполагается, что category передается как ID
            }
    
            // Фильтрация по цене
            if (price_min) {
                whereConditions.price = { [Op.gte]: price_min }; // Минимальная цена
            }
    
            if (price_max) {
                // Если есть минимальная цена, используем диапазон
                if (whereConditions.price) {
                    whereConditions.price[Op.lte] = price_max; // Максимальная цена
                } else {
                    whereConditions.price = { [Op.lte]: price_max }; // Максимальная цена
                }
            }
    
            // Определение порядка сортировки
            const order = [];
    
            if (sort) {
                switch (sort) {
                    case 'newest':
                        order.push(['createdAt', 'DESC']);
                        break;
                    case 'oldest':
                        order.push(['createdAt', 'ASC']);
                        break;
                    case 'price_asc':
                        order.push(['price', 'ASC']);
                        break;
                    case 'price_desc':
                        order.push(['price', 'DESC']);
                        break;
                    default:
                        order.push(['createdAt', 'DESC']);
                }
            }
    
            const page = parseInt(req.query.page) || 1;
            const limit = 18;
            const offset = (page - 1) * limit;
    
            // Запрос продуктов
            const result = await Product.findAndCountAll({
                where: whereConditions,
                order,
                limit,
                offset,
                include: {
                    model: ProductImage,
                    as: 'images',
                    attributes: ['url'],
                    limit: 1
                }
            });
    
            const { count, rows: products } = result;
    
            const formattedProducts = products.map(product => {
                const image = product.images[0];
                return {
                    ...product.toJSON(),
                    imageUrl: image ? image.url : 'https://via.placeholder.com/300'
                };
            });
    
            const totalPages = Math.ceil(count / limit);
            const categories = await Category.findAll();
            res.render('product/product-list', { 
                products: formattedProducts, 
                currentPage: page, 
                totalPages,
                categories,
                search: search || '', // Передаем значение поиска в шаблон
                category: category || '',
                price_min: price_min || '',
                price_max: price_max || '',
                sort: sort || 'newest'
            });
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).send('Server Error');
        }
    }
    



    async getProductDetail(req, res) {
        try {
            const { slug } = req.params;
            const product = await Product.findOne({ where: { slug } });
            if (!product) {
                return res.status(404).send('Product Not Found');
            }
            
            const images = await ProductImage.findAll({ where: { productId: product.id } });
            res.render('product/product-detail', { product, images });
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    }
}

module.exports = new ProductController;
