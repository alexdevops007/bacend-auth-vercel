const express = require("express");
const router = express.Router();

router.get("/profile", (req, res) => {
  // Renvoir les infos de profil de l'utilisateur
  res.json({ user: req.user });
});

module.exports = router;
