const mongoose = require('mongoose');

//Schéma du panier de l'utilisateur / User's cart schema
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    isSold: {
      type: Boolean,
      default: false
    }
  }]
});

module.exports = mongoose.model('Cart', cartSchema);
