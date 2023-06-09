// userController.js

const User = require('../models/user');

exports.getUsers = (_req, res, next) => {
  User.find({}, { email: 0, password: 0 })
    .then(users => {
      res.status(200).json({ users });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getUserById = (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId, { email: 0, password: 0 })
    .then(user => {
      if (!user) {
        const error = new Error('Utilisateur non trouvé');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ user });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateUser = (req, res, next) => {
  const userId = req.params.userId;
  const { name, email } = req.body;

  User.findById(userId)
    .then(user => {
      if (!user) {
        const error = new Error('Utilisateur non trouvé');
        error.statusCode = 404;
        throw error;
      }
      user.name = name;
      user.email = email;
      return user.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Utilisateur mis à jour', user: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId;

  User.findByIdAndRemove(userId)
    .then(result => {
      res.status(200).json({ message: 'Utilisateur supprimé', user: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
