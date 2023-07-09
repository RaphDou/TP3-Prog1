'use strict';

const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const categoriesController = require('../controllers/categoriesController');
const usersController = require('../controllers/usersController');
const isAuth = require('../middleware/is-auth');
const isAdmin = require('../middleware/isAdmin');
const cartController = require('../controllers/cartController');

// Routes pour les utilisateurs
router.get('/users', usersController.getUsers);
router.get('/users/:id', usersController.getUser);


//j'ai pas été capable de le faire fonctionner :/
// router.get('/users/profil', isAuth, usersController.getUserProfil);
router.put('/users/:id', isAuth, usersController.updateUser);
router.delete('/users/:id', isAuth, usersController.deleteUser);

// Routes pour les produits
router.get('/products', productsController.getProducts);
router.get('/products/:id', productsController.getProduct);
router.post('/products', productsController.createProduct);
router.delete('/products/:productId', productsController.deleteProduct);
router.get('/products/user/:userId', isAuth, productsController.getUserProducts);

// Routes pour les catégories
router.get('/categories', categoriesController.getCategories);
router.get('/categories/:id', categoriesController.getCategory);
router.post('/categories', categoriesController.createCategory);
router.put('/categories/:id',categoriesController.updateCategory);
router.delete('/categories/:id',categoriesController.deleteCategory);

// Routes pour le cart
router.get('/cart', isAuth, cartController.getCart);
router.put('/cart', isAuth, cartController.addToCart);
router.delete('/cart/:id', isAuth, cartController.removeFromCart);

// Route pour la recherche de produits
router.get('/search', productsController.searchProducts);


module.exports = router;
