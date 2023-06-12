const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-email -password');
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
  }
};

exports.getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select('-email -password');
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur' });
  }
};

exports.getUserProfile = async (req, res) => {
  const userId = req.user.userId; // supposant que vous avez un middleware d'authentification qui ajoute le champ userId à la demande
  try {
    const user = await User.findById(userId).select('-email -password');
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération du profil utilisateur' });
  }
};




// Modifie l'utilisateur dont l'id est passé en paramètre (si l'utilisateur connecté est le même)
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { user } = req;
  const { isAdmin, cart, ...updatedData } = req.body;

  if (user.id !== id) {
    return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à modifier cet utilisateur' });
  }

  User.findByIdAndUpdate(id, updatedData, { new: true }, (err, updatedUser) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur' });
    } else {
      res.status(200).json(updatedUser);
    }
  });
};

// Supprime l'utilisateur dont l'id est passé en paramètre (si l'utilisateur connecté est le même)
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  const { user } = req;

  if (user.id !== id) {
    return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à supprimer cet utilisateur' });
  }

  User.findByIdAndRemove(id, (err, deletedUser) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur' });
    } else {
      res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    }
  });
};