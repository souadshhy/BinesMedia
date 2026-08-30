require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Mongoose Schema
const contentSchema = new mongoose.Schema({
  data: { type: mongoose.Schema.Types.Mixed, required: true },
});
const Content = mongoose.model("Content", contentSchema);

// API Routes
app.get("/api/content", async (req, res) => {
  try {
    const contentDoc = await Content.findOne();
    if (!contentDoc)
      return res.status(404).json({ message: "No content found" });
    res.json(contentDoc.data);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/content", async (req, res) => {
  try {
    const newContent = req.body;
    let contentDoc = await Content.findOne();

    if (contentDoc) {
      contentDoc.data = newContent;
      contentDoc.markModified("data");
      await contentDoc.save();
    } else {
      contentDoc = new Content({ data: newContent });
      await contentDoc.save();
    }

    res.json({ message: "Saved successfully", data: contentDoc.data });
  } catch (error) {
    res.status(500).json({ error: "Failed to save content" });
  }
});


app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
