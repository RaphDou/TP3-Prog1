"use strict";

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;

// Importe les routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

// Importe le controller des erreurs
const errorController = require('./controllers/errorController');

// middleware pour le format JSON
app.use(express.json()); 


// Déclaration d'un parser pour analyser "le corps (body)" d'une requête entrante avec POST
// Permet donc d'analyser
app.use(express.urlencoded({
  extended: false
}));


// Utilisation des routes en tant que middleware
// route /auth
app.use('/auth', authRoutes);
// route /
app.use(indexRoutes);

// Utilise les routes pour les utilisateurs
app.use('/users', userRoutes);

app.use(errorController.get404);

// gestion des erreurs 
app.use(errorController.logErrors);





mongoose.connect('mongodb://127.0.0.1:27017/TP3')
  .then(() => {
    console.log('La connexion à la base de données est établie')
    app.listen(PORT, () => {
      console.log('Le serveur écoute sur le port 3000');
    });
  })
  .catch(err => {
    console.log('La connexion à la base de données a échoué', err)
  })



