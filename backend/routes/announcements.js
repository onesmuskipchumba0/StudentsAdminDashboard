import express from "express";
import Announcement from "../models/Announcement.js";

const router = express.Router();

// Get all announcements with filters
router.get("/", async (req, res) => {
  try {
    const { category, priority, department, pinned } = req.query;
    let query = {};

    if (category) query.category = category;
    if (priority) query.priority = priority;
    if (department) query.department = department;
    if (pinned) query.pinned = pinned === 'true';

    const announcements = await Announcement.find(query)
      .sort({ pinned: -1, createdAt: -1 });
    
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ message: "Error fetching announcements", error: error.message });
  }
});

// Get announcement by ID
router.get("/:id", async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    res.status(200).json(announcement);
  } catch (error) {
    res.status(500).json({ message: "Error fetching announcement", error: error.message });
  }
});

// Create new announcement
router.post("/", async (req, res) => {
  try {
    const { title, content, category, priority, author, department, attachments, pinned } = req.body;

    const newAnnouncement = new Announcement({
      title,
      content,
      category,
      priority,
      author,
      department,
      attachments: attachments || [],
      pinned: pinned || false
    });

    const savedAnnouncement = await newAnnouncement.save();
    res.status(201).json(savedAnnouncement);
  } catch (error) {
    res.status(400).json({ message: "Error creating announcement", error: error.message });
  }
});

// Update announcement
router.put("/:id", async (req, res) => {
  try {
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedAnnouncement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.status(200).json(updatedAnnouncement);
  } catch (error) {
    res.status(400).json({ message: "Error updating announcement", error: error.message });
  }
});

// Delete announcement
router.delete("/:id", async (req, res) => {
  try {
    const deletedAnnouncement = await Announcement.findByIdAndDelete(req.params.id);
    if (!deletedAnnouncement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    res.status(200).json({ message: "Announcement deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting announcement", error: error.message });
  }
});

// Toggle pin status
router.patch("/:id/pin", async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    announcement.pinned = !announcement.pinned;
    await announcement.save();

    res.status(200).json(announcement);
  } catch (error) {
    res.status(400).json({ message: "Error updating pin status", error: error.message });
  }
});

// Get announcements by category
router.get("/category/:category", async (req, res) => {
  try {
    const announcements = await Announcement.find({ 
      category: req.params.category 
    }).sort({ createdAt: -1 });
    
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ message: "Error fetching announcements", error: error.message });
  }
});

// Get announcements by department
router.get("/department/:department", async (req, res) => {
  try {
    const announcements = await Announcement.find({ 
      department: req.params.department 
    }).sort({ createdAt: -1 });
    
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ message: "Error fetching announcements", error: error.message });
  }
});

export default router;
