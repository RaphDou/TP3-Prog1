"use strict";

const Category = require('../models/category');
const isAdmin = require('../middleware/isAdmin');

// Fais apparaitre toutes les categories / Makes every category appear
exports.getCategories = (_req, res, _next) => {
  Category.find()
    .then(categories => {
      res.status(200).json({ categories });
    })
    .catch(_err => {
      res.status(500).json({ error: 'Nous n\'avon pas réussi à récupérer les catégories!' });
    });
};

//Fais apparaitre la catégorie demandé par l'id / Makes the category appear by id
exports.getCategory = (req, res, _next) => {
  const categoryId = req.params.id;
  Category.findById(categoryId)
    .then(category => {
      if (!category) {
        res.status(404).json({ message: 'La catégorie n\'a pas été trouvée :(' });
      } else {
        res.status(200).json({ category });
      }
    })
    .catch(_err => {
      res.status(500).json({ error: 'Nous n\'avon pas réussi à récupérer la catégorie!' });
    });
};

//creation de la catégorie / creation of a new category
exports.createCategory = [
  async (req, res, _next) => {
    try {
      const { name } = req.body;
      const category = new Category({ name });
      const savedCategory = await category.save();

      res.status(201).json({ message: 'Catégorie créée avec succès', category: savedCategory });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Il y a eu un erreur en créant la catégorie, veuillez réessayer.' });
    }
  }
];

//mise à jour d'une catégorie existente / updates an existing category
exports.updateCategory = [
  async (req, res, _next) => {
    try {
      const categoryId = req.params.id;
      const { name } = req.body;

      const updatedCategory = await Category.findByIdAndUpdate(categoryId, { name }, { new: true });

      if (!updatedCategory) {
        return res.status(404).json({ message: 'La catégorie n\'a pas été trouvée' });
      }

      res.status(200).json({ message: 'Catégorie mise à jour avec succès', category: updatedCategory });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour de la catégorie' });
    }
  }
];

//efface une catégorie / deletes a category
exports.deleteCategory = [
  async (req, res, _next) => {
    try {
      const categoryId = req.params.id;

      const deletedCategory = await Category.findByIdAndDelete(categoryId);

      if (!deletedCategory) {
        return res.status(404).json({ message: 'La catégorie n\'a pas été trouvée' });
      }

      res.status(204).json();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la suppression de la catégorie' });
    }
  }
];

module.exports = exports;
