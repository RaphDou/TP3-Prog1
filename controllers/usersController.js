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
// exports.getUserProfil = async (req, res) => {
//   const userId = req.user.userId;

//   try {
//     const user = await User.findById(userId).select('-email -password');
//     if (user) {
//       res.status(200).json(user);
//     } else {
//       res.status(404).json({ message: 'Utilisateur non trouvé' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Erreur pendant la récupération du profil utilisateur' });
//   }
// };



// Je n'aurai pas été capable de faire cette partie pour le updateUser :(
// exports.updateUser = (req, res) => {
//   const { id } = req.params;
//   const { user } = req;
//   const { cart, isAdmin, ...updatedData } = req.body;

//   if (!user || !user._id || (user._id.toString() !== id.toString() && !user.isAdmin)) {
//     return res.status(403).json({ message: "Vous n'avez pas la permission de modifier cet utilisateur" });
//   }  

//   User.findByIdAndUpdate(
//     id,
//     updatedData,
//     { new: true, select: 'firstname lastname' }
//   )
//     .then(updatedUser => {
//       res.status(200).json(updatedUser);
//     })
//     .catch(error => {
//       console.log(error);
//       res.status(500).json({ message: "Il y a eu une erreur pendant la mise à jour de l'utilisateur" });
//     });
// };



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