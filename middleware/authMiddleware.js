const { getUser } = require("../services/auth");

exports.isAuth = (req, res, next) => {
  const userUid = req.cookies?.uid;
  if (!userUid) {
    return res.status(401).json({ error: "Unauthorized: Token is missing." });
  }
  const user = getUser(userUid);
  if (!user) {
    return res
      .status(401)
      .json({ error: "Unauthorized: Invalid or expired token." });
  }

  req.user = user;
  next();
};
