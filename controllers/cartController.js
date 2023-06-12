const User = require('../models/user');
const Product = require('../models/product');

// Retourne le panier de l'utilisateur connecté
exports.getCart = (req, res, next) => {
  const userId = req.user.userId;

  User.findById(userId)
    .populate('cart.product')
    .then(user => {
      if (!user) {
        res.status(404).json({ error: 'Utilisateur non trouvé' });
      } else {
        res.status(200).json(user.cart);
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Une erreur est survenue lors de la récupération du panier' });
    });
};

// Ajoute un produit au panier de l'utilisateur connecté
exports.addToCart = (req, res, next) => {
  const userId = req.user.userId;
  const productId = req.body.productId;

  Product.findById(productId)
    .then(product => {
      if (!product) {
        res.status(404).json({ error: 'Produit non trouvé' });
      } else {
        User.findByIdAndUpdate(userId, { $addToSet: { cart: { product: productId, isSold: true } } }, { new: true })
          .populate('cart.product')
          .then(user => {
            if (!user) {
              res.status(404).json({ error: 'Utilisateur non trouvé' });
            } else {
              res.status(200).json(user.cart);
            }
          })
          .catch(err => {
            res.status(500).json({ error: 'Une erreur est survenue lors de l\'ajout du produit au panier' });
          });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Une erreur est survenue lors de la récupération du produit' });
    });
};

// Supprime du panier de l'utilisateur connecté le produit dont l'id est passé en paramètre
exports.removeFromCart = (req, res, next) => {
  const userId = req.user.userId;
  const productId = req.params.id;

  User.findByIdAndUpdate(userId, { $pull: { cart: { product: productId } } }, { new: true })
    .populate('cart.product')
    .then(user => {
      if (!user) {
        res.status(404).json({ error: 'Utilisateur non trouvé' });
      } else {
        res.status(200).json(user.cart);
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Une erreur est survenue lors de la suppression du produit du panier' });
    });
};
module.exports = exports;
