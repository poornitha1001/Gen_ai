const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema({
  text: String,
  area: String,
  aiResponse: String,
  status: String,
  location: {
    lat: Number,
    lng: Number
  },
  createdAt: { type: Date, default: Date.now }
});



module.exports = mongoose.model("Complaint", ComplaintSchema);
