'use strict';

const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.find()
    .select('-email -password')
    .then(products => {
      res.status(200).json({
        products: products.map(product => ({
          _id: product._id,
          title: product.title,
          description: product.description,
          price: product.price,
          imageUrl: product.imageUrl,
          categoryId: product.categoryId,
          userId: product.userId,
          isSold: product.isSold
        })),
        pageTitle: 'Accueil'
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .select('-email -password')
    .then(product => {
      if (!product) {
        res.status(404).send();
      }
      res.status(200).json({
        product: {
          _id: product._id,
          title: product.title,
          description: product.description,
          price: product.price,
          imageUrl: product.imageUrl,
          categoryId: product.categoryId,
          userId: product.userId,
          isSold: product.isSold
        },
        pageTitle: 'Product'
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createProduct = (req, res, next) => {
  const { title, description, price, imageUrl, categoryId } = req.body;

  const product = new Product({
    title: title,
    description: description,
    price: price,
    imageUrl: imageUrl,
    categoryId: categoryId,
    userId: req.user.userId
  });

  product
    .save()
    .then(result => {
      res.status(201).json({
        message: 'Votre produit à bien été créé! :D',
        product: {
          _id: _id,
          title: title,
          description: description,
          price: price,
          imageUrl: imageUrl,
          categoryId: categoryId,
          userId: userId,
          isSold: isSold
        }
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateProduct = (req, res, next) => {
  const { title, description, price, imageUrl, categoryId } = req.body;
  const productId = req.params.productId;

  Product.findById(productId)
    .then(product => {
      if (!product) {
        const error = new Error('Product non trouvé');
        error.statusCode = 404;
        throw error;
      }

      product.title = title;
      product.description = description;
      product.price = price;
      product.imageUrl = imageUrl;
      product.categoryId = categoryId;
      return product.save();
    })
    .then(result => {
      res.status(200).json({
        _id: result._id,
        title: result.title,
        description: result.description,
        price: result.price,
        imageUrl: result.imageUrl,
        categoryId: result.categoryId,
        userId: result.userId,
        isSold: result.isSold
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteProduct = (req, res, next) => {
  const productId = req.params.productId;

  Product.findByIdAndRemove(productId)
    .then(() => {
      res.status(204).send();
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getUserProducts = (req, res, next) => {
  const userId = req.params.userId;

  Product.find({ userId: userId })
    .select('-email -password')
    .then(products => {
      res.status(200).json({
        products: products.map(product => ({
          _id: product._id,
          title: product.title,
          description: product.description,
          price: product.price,
          imageUrl: product.imageUrl,
          categoryId: product.categoryId,
          userId: product.userId,
          isSold: product.isSold
        })),
        pageTitle: "Produits de l'utilisateur"
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

module.exports = exports;
