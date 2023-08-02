const express = require("express");
const mongoose = require("mongoose");
const authMiddleware = require("../../middleware/authMiddleware");
const authRoutes = require("../../routes/authRoutes");
const userRoutes = require("../../routes/userRoutes");
const colors = require("colors");
const cors = require("cors");
const helmet = require("helmet");
const config = require("../..config");
const serverless = require("serverless-http");

mongoose
  .connect(config.db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connected to MongoDB`.bgYellow.italic.bold))
  .catch((error) => console.error("Error connecting to MongoDB: ", error));

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "Bienvenue sur l'api d'authentification",
  });
});
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

export const handler = serverless(app);