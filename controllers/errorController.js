"use strict";

// log des erreurs / log error
exports.logErrors = (err, _req, res, _next) => {
  console.error(`Il y a une erreur ! ${err.stack}`);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).json({ message: err.message, statusCode: err.statusCode });
};

//404
exports.get404 = (_req, res) => {
  res
    .status(404)
    .json({ pageTitle: 'Page introuvable !' });
};
module.exports = exports;