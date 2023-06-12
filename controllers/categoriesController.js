"use strict";

const Category = require('../models/category');

exports.getCategories = (req, res, next) => {
  Category.find()
    .then(categories => {
      res.status(200).json({ categories });
    })
    .catch(err => {
      res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des catégories' });
    });
};

exports.getCategory = (req, res, next) => {
  const categoryId = req.params.id;
  Category.findById(categoryId)
    .then(category => {
      if (!category) {
        res.status(404).json({ message: 'La catégorie n\'a pas été trouvée' });
      } else {
        res.status(200).json({ category });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Une erreur est survenue lors de la récupération de la catégorie' });
    });
};

exports.createCategory = (req, res, next) => {
  const { name } = req.body;
  const category = new Category({ name });
  category.save()
    .then(savedCategory => {
      res.status(201).json({ message: 'Catégorie créée avec succès', category: savedCategory });
    })
    .catch(err => {
      res.status(500).json({ error: 'Une erreur est survenue lors de la création de la catégorie' });
    });
};

exports.updateCategory = (req, res, next) => {
  const categoryId = req.params.id;
  const { name } = req.body;
  Category.findByIdAndUpdate(categoryId, { name }, { new: true })
    .then(updatedCategory => {
      if (!updatedCategory) {
        res.status(404).json({ message: 'La catégorie n\'a pas été trouvée' });
      } else {
        res.status(200).json({ message: 'Catégorie mise à jour avec succès', category: updatedCategory });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour de la catégorie' });
    });
};

exports.deleteCategory = (req, res, next) => {
  const categoryId = req.params.id;
  Category.findByIdAndDelete(categoryId)
    .then(deletedCategory => {
      if (!deletedCategory) {
        res.status(404).json({ message: 'La catégorie n\'a pas été trouvée' });
      } else {
        res.status(204).json();
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Une erreur est survenue lors de la suppression de la catégorie' });
    });
};
module.exports = exports;