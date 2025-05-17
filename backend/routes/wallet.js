const express = require("express");
const router = express.Router();
const Wallet = require("../models/wallet");
const jwt = require("jsonwebtoken");

// Auth middleware (verifies JWT)
function authMiddleware(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(400).json({ msg: "Token is not valid" });
  }
}

// GET wallet balance
router.get("/balance", authMiddleware, async (req, res) => {
  try {
    let wallet = await Wallet.findOne({ user: req.user });
    if (!wallet) {
      wallet = new Wallet({ user: req.user, balance: 0 });
      await wallet.save();
    }
    res.json({ balance: wallet.balance });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});
// POST /deposit - Add money to wallet
router.post("/deposit", authMiddleware, async (req, res) => {
    const { amount } = req.body;
  
    if (!amount || amount <= 0) {
      return res.status(400).json({ msg: "Invalid deposit amount" });
    }
  
    try {
      let wallet = await Wallet.findOne({ user: req.user });
  
      // Create wallet if it doesn't exist
      if (!wallet) {
        wallet = new Wallet({ user: req.user, balance: 0 });
      }
  
      wallet.balance += amount;
      await wallet.save();
  
      res.json({ msg: "Deposit successful", balance: wallet.balance });
    } catch (err) {
      res.status(500).json({ msg: "Server error" });
    }
  });
  
module.exports = router;
