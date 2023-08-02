const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("../../utils/jwt");
const User = require("../../models/user");
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Vérification si l'utilisateur existe
    const user = await User.findOne({ username });
    if (!user) {
      res.status(400).json({ message: "Nom utilisateur invalide" });
    }

    //Vérification du mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Mot de passe invalide" });
    }

    // Créer et renvoyer le JWT
    const token = jwt.sign({ userId: user._id });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Erreur Server");
  }
});

module.exports = router;
