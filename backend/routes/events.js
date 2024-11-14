import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

// Get all events with filters
router.get("/", async (req, res) => {
  try {
    const { type, startDate, endDate } = req.query;
    let query = {};

    if (type) query.type = type;
    if (startDate || endDate) {
      query.startDate = {};
      if (startDate) query.startDate.$gte = new Date(startDate);
      if (endDate) query.endDate.$lte = new Date(endDate);
    }

    const events = await Event.find(query).sort({ startDate: 1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error: error.message });
  }
});

// Get event by ID
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Error fetching event", error: error.message });
  }
});

// Create new event
router.post("/", async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ message: "Error creating event", error: error.message });
  }
});

// Update event
router.put("/:id", async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: "Error updating event", error: error.message });
  }
});

// Delete event
router.delete("/:id", async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error: error.message });
  }
});

// Get events by type
router.get("/type/:type", async (req, res) => {
  try {
    const events = await Event.find({ type: req.params.type })
      .sort({ startDate: 1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error: error.message });
  }
});

// Get upcoming events
router.get("/upcoming/all", async (req, res) => {
  try {
    const events = await Event.find({
      startDate: { $gte: new Date() }
    }).sort({ startDate: 1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching upcoming events", error: error.message });
  }
});

// Get events by date range
router.get("/range/:start/:end", async (req, res) => {
  try {
    const { start, end } = req.params;
    const events = await Event.find({
      startDate: { $gte: new Date(start) },
      endDate: { $lte: new Date(end) }
    }).sort({ startDate: 1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error: error.message });
  }
});

export default router;
