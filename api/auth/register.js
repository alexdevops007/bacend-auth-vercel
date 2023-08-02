const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("../../utils/jwt");
const User = require("../../models/user");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Vérification si l'utilisateur existe déjà
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "L'utilisateur existe déjà" });
    }

    // Création d'un nouvel utilisateur
    const user = new User({
      username,
      password,
    });

    // Hasher le mot de passe
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Créer et renvoyer le JWT
    const token = jwt.sign({ userId: user._id });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Erreur Server");
  }
});

module.exports = router;
