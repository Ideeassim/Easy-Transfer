const mongoose = require("mongoose");

const TransferSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ["success", "failed"], default: "success" },
});

module.exports = mongoose.model("Transfer", TransferSchema);
