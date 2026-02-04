const router = require("express").Router();
const axios = require("axios");
const Complaint = require("../models/Complaint");

async function classify(text) {
  const res = await axios.post("http://localhost:11434/api/generate", {
    model: "llama3",
    prompt: `Classify this civic complaint:\n${text}\nReturn category, priority, department`
  });
  return res.data.response;
}

router.post("/complaint", async (req, res) => {
  try {
    const ai = await classify(req.body.text);

    const c = new Complaint({
      text: req.body.text,
      aiResponse: ai,
      status: "Pending"
    });

    await c.save();
    res.json(c);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
