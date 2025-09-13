const checkUser = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || authorization !== 'Bearer True') {
    return res.status(401).json({ message: 'Not Authenticated/Unauthorized' });
  }
  return next();
};

module.exports = {
  checkUser,
};
