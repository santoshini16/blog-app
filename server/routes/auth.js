import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Usermodel from "../model/user.js";
import { body, validationResult } from "express-validator";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

// Register route
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").isStrongPassword().withMessage("Use a strong Password"),
    body("confirmedPassword")
      .custom((value, { req }) => value === req.body.password)
      .withMessage("Passwords do not match"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if the email already exists
      const existingUser = await Usermodel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email Already Exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new Usermodel({ email, password: hashedPassword });
      await user.save();

      res.status(201).json({ message: "User Created Successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Login route
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").not().isEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await Usermodel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "Email Not Found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Password Does Not Match" });
      }

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.cookie("token", token, { httpOnly: true });
      res.status(200).json({ message: "Login Successful", redirect: "/home" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Reset password route
router.post(
  "/reset-password",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("confirmedPassword")
      .custom((value, { req }) => value === req.body.password)
      .withMessage("Passwords do not match"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await Usermodel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "Email Not Found" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      await user.save();

      res.status(200).json({ message: "Password Updated Successfully", redirect: "/login" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Protected route
router.get("/protected", verifyToken, (req, res, next) => {
  res.status(200).json({ message: "This is a protected route", user: req.user });
});

export default router;

