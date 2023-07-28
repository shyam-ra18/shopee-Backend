const { getUser } = require("../services/auth");

exports.isAuth = (req, res, next) => {
  const userUid = req.cookies?.uid;
  if (!userUid) return res.sendStatus(401);
  const user = getUser(userUid);
  if (!user) return res.sendStatus(401);

  next();
};
