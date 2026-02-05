const router = require("express").Router();
const axios = require("axios");
const Complaint = require("../models/Complaint");

async function classify(text) {
  const res = await axios.post("http://localhost:11434/api/generate", {
    model: "llama3",
    prompt: `Classify this civic complaint:\n${text}\nReturn category, priority, department.`,
    stream: false
  });

  console.log("RAW OLLAMA RESPONSE:", res.data);

  return res.data.response;
}

// Get all complaints
router.get("/complaints", async (req, res) => {
  const list = await Complaint.find().sort({ createdAt: -1 });
  res.json(list);
});


router.post("/complaint", async (req, res) => {
  try {
    const ai = await classify(req.body.text);

    const c = new Complaint({
      text: req.body.text,
      area: req.body.area,
      aiResponse: ai,
      status: "Pending",
      location: req.body.location
    });



    await c.save();
    res.json(c);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

// Update complaint status
router.put("/complaint/:id", async (req, res) => {
  try {
    const updated = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

