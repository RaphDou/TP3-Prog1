const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/user');

dotenv.config();

function authent(req, res, next) {
  const authHeader = req.get('Authorization');
  console.log('authHeader', authHeader);
  if (!authHeader) {
    res.status(401).json({ error: 'Non authentifié.' });
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SECRET_JWT);
  } catch (err) {
    err.statusCode = 401;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error('Non authentifié.');
    error.statusCode = 401;
    throw error;
  }

  // Récupérer l'utilisateur correspondant à partir de la base de données // Gets authenticated from the server
  User.findById(decodedToken.userId)
    .then(user => {
      if (!user) {
        throw new Error("Cet utilisateur n'a pas été trouvé !");
      }

      // Ajouter la propriété isAdmin à l'objet decodedToken // Adds the isAdmin property to object decodedToken
      decodedToken.isAdmin = user.isAdmin;

      // Définir req.userId avec l'ID de l'utilisateur / Defines req.userId with user ID
      req.userId = decodedToken.userId;

      // Passe le token décodé dans la requête pour pouvoir l'utiliser ailleurs / Passes decoded token in request tfor usage
      req.user = decodedToken;
      console.log('decodedToken', decodedToken);
      next();
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de la vérification de l'utilisateur" });
    });
}

module.exports = authent;
