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

  // Récupérer l'utilisateur correspondant à partir de la base de données
  User.findById(decodedToken.userId)
    .then(user => {
      if (!user) {
        throw new Error('Cet utilisateur n\'as pas été trouvé!');
      }

      // Ajouter la propriété isAdmin à l'objet decodedToken
      decodedToken.isAdmin = user.isAdmin;

      // Passe le token décodé dans la requête pour pouvoir l'utiliser ailleurs
      req.user = decodedToken;
      console.log('decodedToken', decodedToken);
      next();
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la vérification de l\'utilisateur' });
    });
}

module.exports = authent;
