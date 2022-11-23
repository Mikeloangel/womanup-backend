// handles errors
module.exports.handleErrors = (err, req, res, next) => {
  // proper error handling saving for future
  res.status(418).send(err);
};
