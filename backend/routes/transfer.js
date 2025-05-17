const express = require("express");
const router = express.Router();
const Wallet = require("../models/wallet");
const Vendor = require("../models/vendor");
const authMiddleware = require("../middleware/authMiddleware");
const Transfer = require("../models/Transfer"); // Assuming you have a Transfer model

router.post("/send", authMiddleware, async (req, res) => {
  const { vendorId, amount } = req.body;

  if (!vendorId || !amount || amount <= 0) {
    return res.status(400).json({ msg: "Invalid input" });
  }

  try {
    const wallet = await Wallet.findOne({ user: req.user });
    if (!wallet || wallet.balance < amount) {
      return res.status(400).json({ msg: "Insufficient balance" });
    }

    const vendor = await Vendor.findOne({ _id: vendorId, user: req.user });
    if (!vendor) {
      return res.status(404).json({ msg: "Vendor not found" });
    }

    wallet.balance -= amount;
    await wallet.save();

 // Create transfer record here
    const transfer = new Transfer({
      user: req.user,
      vendor: vendorId,
      amount,
      status: "success",
    });
    await transfer.save();

    // (Optional) Log transaction to a history collection

    res.json({
      msg: `₦${amount} sent to ${vendor.name}`,
      balance: wallet.balance,
    });
  } catch (err) {
    console.error("Transfer error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/history", authMiddleware, async (req, res) => {
    try {
      const transfers = await Transfer.find({ user: req.user })
        .populate("vendor", "name accountNumber")  // get vendor details
        .sort({ createdAt: -1 }); // newest first

  
      res.json({ transfers });
    } catch (err) {
      res.status(500).json({ msg: "Server error" });
    }
  });
  

module.exports = router;
