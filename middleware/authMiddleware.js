const jwt = require("jsonwebtoken");
const config = require("../config")

function authMiddleware(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Pas de token, autorisation refusée" });
  }

  try {
    const decoded = jwt.verify(token, config.secret);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Le token n'est pas valide" });
  }
}

module.exports = authMiddleware;
