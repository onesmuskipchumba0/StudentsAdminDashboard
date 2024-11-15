import express from "express";
import multer from "multer";
import Document from "../models/Document.js";

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Make sure this directory exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Add allowed file types
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// Upload document route
router.post("/upload", upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileSize = (req.file.size / 1024).toFixed(2) + ' KB';
    const fileType = req.file.originalname.split('.').pop().toLowerCase();
    
    const tags = req.body.tags ? JSON.parse(req.body.tags) : [];

    const document = new Document({
      name: req.file.originalname,
      type: fileType,
      size: fileSize,
      owner: req.body.owner || 'Anonymous', // Replace with actual user
      url: req.file.path,
      tags: tags
    });

    await document.save();
    res.status(201).json(document);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      message: "Error uploading document", 
      error: error.message 
    });
  }
});

// Get all documents with filters
router.get("/", async (req, res) => {
  try {
    const { type, owner, shared, starred, tags } = req.query;
    let query = {};

    if (type) query.type = type;
    if (owner) query.owner = owner;
    if (shared) query.shared = shared === 'true';
    if (starred) query.starred = starred === 'true';
    if (tags) query.tags = { $in: tags.split(',') };

    const documents = await Document.find(query)
      .sort({ modified: -1 });
    
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ message: "Error fetching documents", error: error.message });
  }
});

// Get document by ID
router.get("/:id", async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.status(200).json(document);
  } catch (error) {
    res.status(500).json({ message: "Error fetching document", error: error.message });
  }
});

// Create new document
router.post("/", async (req, res) => {
  try {
    const newDocument = new Document(req.body);
    const savedDocument = await newDocument.save();
    res.status(201).json(savedDocument);
  } catch (error) {
    res.status(400).json({ message: "Error creating document", error: error.message });
  }
});

// Update document
router.put("/:id", async (req, res) => {
  try {
    const updatedDocument = await Document.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedDocument) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.status(200).json(updatedDocument);
  } catch (error) {
    res.status(400).json({ message: "Error updating document", error: error.message });
  }
});

// Delete document
router.delete("/:id", async (req, res) => {
  try {
    const deletedDocument = await Document.findByIdAndDelete(req.params.id);
    if (!deletedDocument) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.status(200).json({ message: "Document deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting document", error: error.message });
  }
});

// Toggle star status
router.patch("/:id/star", async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    document.starred = !document.starred;
    await document.save();
    
    res.status(200).json(document);
  } catch (error) {
    res.status(400).json({ message: "Error updating star status", error: error.message });
  }
});

// Toggle share status
router.patch("/:id/share", async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    document.shared = !document.shared;
    await document.save();
    
    res.status(200).json(document);
  } catch (error) {
    res.status(400).json({ message: "Error updating share status", error: error.message });
  }
});

// Add tags to document
router.patch("/:id/tags", async (req, res) => {
  try {
    const { tags } = req.body;
    const document = await Document.findById(req.params.id);
    
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    document.tags = [...new Set([...document.tags, ...tags])];
    await document.save();
    
    res.status(200).json(document);
  } catch (error) {
    res.status(400).json({ message: "Error updating tags", error: error.message });
  }
});

// Get documents by type
router.get("/type/:type", async (req, res) => {
  try {
    const documents = await Document.find({ type: req.params.type })
      .sort({ modified: -1 });
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ message: "Error fetching documents", error: error.message });
  }
});

export default router;
