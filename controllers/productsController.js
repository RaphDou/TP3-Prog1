"use strict";

// Récupère le modèle Product
const Product = require('../models/product');


// Utilise la méthode find() afin de récupérer tous les products
exports.getProducts = (req, res, next) => {
  Product.find()
  .then(products => {
    res.status(200).json({
      products: products,
      pageTitle: 'Accueil'
    });
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  });
};

// Récupère un product grâce à son id
exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
  .then(product => {
    if (!product) {
      res.status(404).send();
    }
    res.status(200).json({
      product: product,
      pageTitle: 'Product'
    });
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  });
};


exports.createProduct = (req, res, next) => {
  const { title, desc, image } = req.body

  const product = new Product({
    title: title,
    desc: desc,
    image: image,
    userId: req.user.userId
  });

  product.save()
    .then(result => {
      res.status(201).json({
        message: "Product créé avec succès",
        product: result
      })
    })
    .catch(err => {
      return res.status(422).json({
        errorMessage: err.errors
      })
    })


}

exports.updateProduct = (req, res, next) => {
  const { title, desc, image } = req.body
  const productId = req.params.productId
  console.log('title', title)
  Product.findById(productId)
  .then(product => {
    product.title = title;
    product.desc = desc;
    product.image = image;
    return product.save()
  })
  .then( result => {
    res.status(200).json(result)
  })
  .catch(err => {
    next(err)
  })
}


exports.deleteProduct = (req, res, next) => {
const productId = req.params.productId

Product.findByIdAndRemove(productId)
  .then(_ => {
    res.status(204).send()
  })
  .catch(err => {
    next(err)
  })
}

