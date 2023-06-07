"use strict";

const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articlesController');
// isAuth est un middleware qui vérifie si l'utilisateur est authentifié
const isAuth = require('../middleware/is-auth');


// /articles => GET
router.get('/articles', articlesController.getArticles);

// /article/articleId => GET
router.get('/articles/:articleId', articlesController.getArticle);

// On ajoute le middleware isAuth pour vérifier si l'utilisateur est authentifié
// Pour pouvoir ajouer, modifier ou supprimer un article, il faut être authentifié

// /articles => POST
router.post('/articles', isAuth, articlesController.createArticle);

// /articles => PUT
router.put('/articles/:articleId', isAuth, articlesController.updateArticle);

// /articles/:articleId => DELETE
router.delete('/articles/:articleId', isAuth, articlesController.deleteArticle);

// Export des routes pour utilisation dans app.js
module.exports = router;

