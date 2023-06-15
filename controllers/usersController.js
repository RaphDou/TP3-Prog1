const User = require('../models/user');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('firstname lastname email city');
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Nous n\'avons pas réussi à réupérer tout les utilisateurs :(' });
  }
};

exports.getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select('firstname lastname email city');
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


// Je n'aurai pas été capable de faire cette partie pour le getUserProfil :(
  // exports.getUserProfil = (req, res) => {
  //   const userId = req.user.userId;
  
  //   User.findById(userId)
  //     .select('-email -password')
  //     .then(user => {
  //       if (user) {
  //         res.status(200).json(user);
  //       } else {
  //         res.status(404).json({ message: 'Utilisateur non trouvé' });
  //       }
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       res.status(500).json({ message: 'Erreur lors de la récupération du profil utilisateur' });
  //     });
  // };
  
  exports.updateUser = (req, res, next) => {
    const userId = req.params.id;
    const { firstname, lastname, city, email, password } = req.body;
  
    if (req.userId !== userId) {
      return res.status(403).json({ error: "Vous n'êtes pas autorisé à modifier cet utilisateur." });
    }
  
    User.findById(userId)
      .then(user => {
        if (!user) {
          return res.status(404).json({ error: "L'utilisateur demandé n'existe pas." });
        }
        user.password = password;
        user.email = email;
        user.firstname = firstname;
        user.lastname = lastname;
        user.city = city;
  
        return user.save();
      })
      .then(result => {
        res.status(200).json({ message: "L'utilisateur a été mis à jour avec succès.", user: result });
      })
      .catch(error => {
        res.status(500).json({ error: "Une erreur est survenue lors de la mise à jour de l'utilisateur.", error });
      });
  };
  

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const { userId, isAdmin } = req.user;

  if (userId !== id && !isAdmin) {
    return res.status(403).json({ message: "Vous n'êtes pas autorisé à supprimer cet utilisateur" });
  }

  try {
    await User.findByIdAndRemove(id);
    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur" });
  }
};

module.exports = exports;