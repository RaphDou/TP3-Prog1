'use strict';

const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const categoriesController = require('../controllers/categoriesController');
const usersController = require('../controllers/usersController');
const isAuth = require('../middleware/is-auth');
const cartController = require('../controllers/cartController');

// Routes pour les utilisateurs
router.get('/users', usersController.getUsers);
router.get('/users/:id', usersController.getUser);

//Ces deux routes là ne fonctionne pas, j'ai essayé plein de choses, mais j'ai pas réussi à les faire fonctionner :/
// router.get('/users/profil', isAuth, usersController.getUserProfil);
// router.put('/users/:id', isAuth, usersController.updateUser);


router.delete('/users/:id', isAuth, usersController.deleteUser);

// Routes pour les produits
router.get('/products', productsController.getProducts);
router.get('/products/:id', productsController.getProduct);
router.post('/products', isAuth, productsController.createProduct);
router.delete('/products/:productId', isAuth, productsController.deleteProduct);
router.get('/products/user/:userId', isAuth, productsController.getUserProducts);

// Routes pour les catégories
router.get('/categories', categoriesController.getCategories);
router.get('/categories/:id', categoriesController.getCategory);
router.post('/categories', isAuth, categoriesController.createCategory);
router.put('/categories/:id', isAuth, categoriesController.updateCategory);
router.delete('/categories/:id', isAuth, categoriesController.deleteCategory);

// Routes pour le cart
router.get('/cart', isAuth, cartController.getCart);
router.put('/cart', isAuth, cartController.addToCart);
router.delete('/cart/:id', isAuth, cartController.removeFromCart);

// Route pour la recherche de produits
router.get('/search', productsController.searchProducts);


module.exports = router;
