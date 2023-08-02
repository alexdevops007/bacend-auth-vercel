const express = require("express");
const mongoose = require("mongoose");
const authMiddleware = require("./middleware/authMiddleware");
const login = require("./api/auth/login");
const register = require("./api/auth/register");
const profile = require("./api/user/profile");
const colors = require("colors");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();


mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connected to MongoDB`.bgYellow.italic.bold))
  .catch((error) => console.error("Error connecting to MongoDB: ", error));

const app = express()
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "Bienvenue sur l'api d'authentification"
  })
})
app.use("/api/auth", login)
app.use("/api/auth", register)
app.use("/api/user", authMiddleware, profile)

module.exports = app;