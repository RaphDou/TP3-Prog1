const User = require('../models/user');
const Product = require('../models/product');

// Retourne le panier de l'utilisateur connecté
exports.getCart = (req, res, _next) => {
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
    .catch(_err => {
      res.status(500).json({ error: 'Une erreur est survenue lors de la récupération du panier' });
    });
};

// Ajoute un produit au panier de l'utilisateur connecté
exports.addToCart = async (req, res, _next) => {
  const userId = req.user.userId;
  const productId = req.body.productId;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    // Vérifier si le produit est déjà présent dans le panier de l'utilisateur
    const existingCartItem = user.cart.find(item => item.product.toString() === productId);
    if (existingCartItem) {
      return res.status(400).json({ error: 'Le produit est déjà présent dans le panier' });
    }

    const cartItem = {
      product: productId,
      isSold: true
    };

    user.cart.push(cartItem);
    product.isSold = true;

    await Promise.all([user.save(), product.save()]);

    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de l\'ajout du produit au panier, veuillez réessayer' });
  }
};


exports.removeFromCart = async (req, res, _next) => {
  const userId = req.user.userId;
  const productId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé!' });
    }

    const cartIndex = user.cart.findIndex(item => item.product.toString() === productId);
    if (cartIndex === -1) {
      return res.status(404).json({ error: 'Ce produit n\'est pas dans votre panier!' });
    }

    const removedProduct = user.cart[cartIndex];

    // Mettre à jour la valeur isSold du produit à false
    await Product.findByIdAndUpdate(removedProduct.product, { isSold: false });

    user.cart.splice(cartIndex, 1);
    await user.save();

    res.status(200).json({
      message: 'Produit supprimé du panier avec succès, bye bye produit!',
      removedProduct: removedProduct,
      remainingProducts: user.cart
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Il y a eu une erreur pendant la suppression du produit du panier' });
  }
};
