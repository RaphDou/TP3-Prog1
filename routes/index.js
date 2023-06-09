"use strict";

const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
// isAuth est un middleware qui vérifie si l'utilisateur est authentifié
const isAuth = require('../middleware/is-auth');


// /products => GET
router.get('/products', productsController.getProducts);

// /product/productId => GET
router.get('/products/:productId', productsController.getProduct);

// On ajoute le middleware isAuth pour vérifier si l'utilisateur est authentifié
// Pour pouvoir ajouer, modifier ou supprimer un product, il faut être authentifié

// /products => POST
router.post('/products', isAuth, productsController.createProduct);

// /products => PUT
router.put('/products/:productId', isAuth, productsController.updateProduct);

// /products/:productId => DELETE
router.delete('/products/:productId', isAuth, productsController.deleteProduct);

// Export des routes pour utilisation dans app.js
module.exports = router;

