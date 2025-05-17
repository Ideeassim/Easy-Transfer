const express = require("express");
const router = express.Router();
const Vendor = require("../models/vendor");
const authMiddleware = require("../middleware/authMiddleware"); // We'll create this for JWT verification

// Add a new vendor
router.post("/add", authMiddleware, async (req, res) => {

 
  const { name, accountNumber } = req.body;

  if (!name || !accountNumber) {
    return res.status(400).json({ msg: "Please provide all required fields" });
  }

  try {
    // Create a new vendor
    const vendor = new Vendor({
      name,
      accountNumber,
      user: req.user, // Store the user ID who created this vendor
    });

    await vendor.save();
    res.json({ msg: "Vendor added successfully", vendor });
  } catch (err) {
    console.error("Add vendor error:", err);
    
    if (err.code === 11000) {
      return res.status(400).json({ msg: "Account number already exists" });
    }

    res.status(500).json({ msg: "Server error" });
  }

});

// Get all vendors for the logged-in user
router.get("/all", authMiddleware, async (req, res) => {
  try {
    const vendors = await Vendor.find({ user: req.user });
    res.json({ vendors });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
