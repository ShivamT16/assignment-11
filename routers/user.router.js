const express = require("express");
const userRouter = express.Router();

const { signup, login } = require("../services/userServices");

userRouter.use(express.json());

userRouter.post("/signup", async (req, res) => {
  try {
    const savedUser = await signup(req.body);
    if (savedUser) {
      res.status(200).json({ "Signup success": savedUser });
    } else {
      res.status(401).json({ error: "Fill all details!" });
    }
  } catch (error) {
    res.status(500).json({ "signup failed": error });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await login(email, password);
    if (user) {
      res.status(200).json({ "Login success": user });
    } else {
      res.status(404).json({ error: "Credentials Invalid" });
    }
  } catch (error) {
    res.status(500).json({ "Login failed": error });
  }
});

module.exports = userRouter;
