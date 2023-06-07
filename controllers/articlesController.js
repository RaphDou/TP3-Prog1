"use strict";

// Récupère le modèle Article
const Article = require('../models/article');


// Utilise la méthode find() afin de récupérer tous les articles
exports.getArticles = (req, res, next) => {
  Article.find()
  .then(articles => {
    res.status(200).json({
      articles: articles,
      pageTitle: 'Accueil'
    });
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  });
};

// Récupère un article grâce à son id
exports.getArticle = (req, res, next) => {
  const articleId = req.params.articleId;
  Article.findById(articleId)
  .then(article => {
    if (!article) {
      res.status(404).send();
    }
    res.status(200).json({
      article: article,
      pageTitle: 'Article'
    });
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  });
};


exports.createArticle = (req, res, next) => {
  const { title, desc, image } = req.body

  const article = new Article({
    title: title,
    desc: desc,
    image: image,
    userId: req.user.userId
  });

  article.save()
    .then(result => {
      res.status(201).json({
        message: "Article créé avec succès",
        article: result
      })
    })
    .catch(err => {
      return res.status(422).json({
        errorMessage: err.errors
      })
    })


}

exports.updateArticle = (req, res, next) => {
  const { title, desc, image } = req.body
  const articleId = req.params.articleId
  console.log('title', title)
  Article.findById(articleId)
  .then(article => {
    article.title = title;
    article.desc = desc;
    article.image = image;
    return article.save()
  })
  .then( result => {
    res.status(200).json(result)
  })
  .catch(err => {
    next(err)
  })
}


exports.deleteArticle = (req, res, next) => {
const articleId = req.params.articleId

Article.findByIdAndRemove(articleId)
  .then(_ => {
    res.status(204).send()
  })
  .catch(err => {
    next(err)
  })
}

