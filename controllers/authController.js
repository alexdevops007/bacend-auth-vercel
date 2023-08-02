const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/user");

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Vérification si l'utilisateur existe déjà
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "L'utilisateur existe déjà" });
    }

    // Création d'un nouvel utilisateur
    user = new User({
      username,
      password,
    });

    // Hasher le mot de passe
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Créer et renvoyer le JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, config.secret, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Erreur Server");
  }
};

exports.login = async (req, res) => {
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
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, config.secret, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Erreur Server");
  }
};
