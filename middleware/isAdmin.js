//La fonction regarde si l'utilisateur est admin ou non / The function checks if the user is an admin or not
const isAdmin = (req, res, next) => {
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Accès refusé. Vous devez être administrateur.' });
    }
    next();
  };
  
  module.exports = isAdmin;
  