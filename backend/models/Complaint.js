const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema({
  text: String,
  aiResponse: String,
  status: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Complaint", ComplaintSchema);
