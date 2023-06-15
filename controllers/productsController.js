'use strict';

const Product = require('../models/product');

exports.getProducts = (_req, res, next) => {
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
  const productId = req.params.id; // Modifier ici pour utiliser req.params.id au lieu de req.params.productId
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

  // Convertir le prix en cents
  const priceInCents = Math.round(price * 100);

  const product = new Product({
    title: title,
    description: description,
    price: priceInCents, // Enregistrer le prix en cents
    imageUrl: imageUrl,
    categoryId: categoryId,
    userId: req.user.userId
  });

  product
    .save()
    .then(result => {
      res.status(201).json({
        message: 'Votre produit a bien été créé! :D',
        product: {
          _id: result._id,
          title: result.title,
          description: result.description,
          price: result.price, // Le prix sera en cents
          imageUrl: result.imageUrl,
          categoryId: result.categoryId,
          userId: result.userId,
          isSold: result.isSold
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
        const error = new Error('Product non trouvé :(');
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
    .then(deletedProduct => {
      if (!deletedProduct) {
        // Si le produit n'a pas été trouvé, vous pouvez renvoyer un message indiquant qu'il n'a pas été trouvé.
        return res.status(404).json({ message: 'Produit introuvable :(' });
      }
      res.status(204).json({
        message: 'Le produit a été supprimé avec succès, bye bye produit!',
        deletedProduct: {
          _id: deletedProduct._id,
          title: deletedProduct.title,
          description: deletedProduct.description,
          price: deletedProduct.price,
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
        pageTitle: "Vos produits publiés!"
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.searchProducts = (req, res, _next) => {
  const searchQuery = req.query.q;

  Product.find({ title: { $regex: searchQuery, $options: 'i' } })
    .then(products => {
      res.status(200).json(products);
    })
    .catch(_err => {
      res.status(500).json({ error: 'Nous ne trouvons pas ce que vous cherchez!' });
    });
};

module.exports = exports;
