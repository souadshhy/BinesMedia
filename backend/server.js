require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { Readable } = require("stream");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// Configure Multer (Stores image in RAM temporarily before sending to Cloudinary)
const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Connected to MongoDB");
    const adminExists = await Admin.findOne({ username: "admin" });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      await Admin.create({ username: "admin", password: hashedPassword });
    }
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Mongoose Schemas
const contentSchema = new mongoose.Schema({
  data: { type: mongoose.Schema.Types.Mixed, required: true },
});
const Content = mongoose.model("Content", contentSchema);

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const Admin = mongoose.model("Admin", adminSchema);

// JWT Verification Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ error: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

// --- API Routes ---

app.post("/api/auth/login", async (req, res) => {
  try {
    const { password } = req.body;
    const admin = await Admin.findOne({ username: "admin" });
    if (!admin) return res.status(404).json({ error: "Admin not found" });

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword)
      return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "12h" },
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Server login error" });
  }
});

app.get("/api/auth/verify", verifyToken, (req, res) => {
  res.status(200).json({ valid: true });
});

app.post(
  "/api/upload",
  verifyToken,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file)
        return res.status(400).json({ error: "No image provided" });

      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          (error, uploaded) => {
            if (error) return reject(error);
            resolve(uploaded);
          },
        );

        Readable.from(req.file.buffer).pipe(uploadStream);
      });

      res.json({ secure_url: result.secure_url });
      // ... inside /api/upload
    } catch (error) {
      console.error("FULL CLOUDINARY ERROR:", JSON.stringify(error, null, 2));
      console.error("RAW ERROR OBJECT:", error);

      res.status(500).json({
        error: "Image upload failed",
        message: error.message,
        cloudinary_details: error,
      });
    }
  },
);

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY,
        name,
        email,
        message,
      }),
    });

    const data = await response.json();

    if (data.success) {
      res.json({ success: true });
    } else {
      res
        .status(400)
        .json({ success: false, error: "Web3Forms rejected submission" });
    }
  } catch (error) {
    console.error("Contact route error:", error);
    res
      .status(500)
      .json({ success: false, error: "Server failed to send email" });
  }
});

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

app.post("/api/content", verifyToken, async (req, res) => {
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

// Serve React Frontend
app.use(express.static(path.join(__dirname, "dist")));
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
