"use strict";

exports.logErrors = (err, _req, res, _next) => {
  console.error(`Il y a une erreur ! ${err.stack}`);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).json({ message: err.message, statusCode: err.statusCode });
};

exports.get404 = (_req, res) => {
  res
    .status(404)
    .json({ pageTitle: 'Page introuvable !' });
};