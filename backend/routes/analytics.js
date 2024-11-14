import express from "express";
import Analytics from "../models/Analytics.js";

const router = express.Router();

// Get all analytics data
router.get("/", async (req, res) => {
  try {
    const analytics = await Analytics.find().sort({ createdAt: -1 }).limit(1);
    res.status(200).json(analytics[0]);
  } catch (error) {
    res.status(500).json({ message: "Error fetching analytics", error: error.message });
  }
});

// Get enrollment data
router.get("/enrollment", async (req, res) => {
  try {
    const { year, semester, department } = req.query;
    let query = {};
    
    if (year) query["enrollmentData.year"] = year;
    if (semester) query["enrollmentData.semester"] = semester;
    if (department) query["enrollmentData.department"] = department;

    const analytics = await Analytics.findOne(query);
    res.status(200).json(analytics?.enrollmentData || []);
  } catch (error) {
    res.status(500).json({ message: "Error fetching enrollment data", error: error.message });
  }
});

// Get grade distribution
router.get("/grades", async (req, res) => {
  try {
    const { department, year, semester } = req.query;
    let query = {};
    
    if (department) query["gradeData.department"] = department;
    if (year) query["gradeData.year"] = year;
    if (semester) query["gradeData.semester"] = semester;

    const analytics = await Analytics.findOne(query);
    res.status(200).json(analytics?.gradeData || []);
  } catch (error) {
    res.status(500).json({ message: "Error fetching grade data", error: error.message });
  }
});

// Get department statistics
router.get("/departments", async (req, res) => {
  try {
    const { year } = req.query;
    let query = {};
    
    if (year) query["departmentData.year"] = year;

    const analytics = await Analytics.findOne(query);
    res.status(200).json(analytics?.departmentData || []);
  } catch (error) {
    res.status(500).json({ message: "Error fetching department data", error: error.message });
  }
});

// Get attendance data
router.get("/attendance", async (req, res) => {
  try {
    const { department, year, month } = req.query;
    let query = {};
    
    if (department) query["attendanceData.department"] = department;
    if (year) query["attendanceData.year"] = year;
    if (month) query["attendanceData.month"] = month;

    const analytics = await Analytics.findOne(query);
    res.status(200).json(analytics?.attendanceData || []);
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance data", error: error.message });
  }
});

// Get revenue data
router.get("/revenue", async (req, res) => {
  try {
    const { department, year, month } = req.query;
    let query = {};
    
    if (department) query["revenueData.department"] = department;
    if (year) query["revenueData.year"] = year;
    if (month) query["revenueData.month"] = month;

    const analytics = await Analytics.findOne(query);
    res.status(200).json(analytics?.revenueData || []);
  } catch (error) {
    res.status(500).json({ message: "Error fetching revenue data", error: error.message });
  }
});

// Update analytics data
router.post("/update", async (req, res) => {
  try {
    const analytics = await Analytics.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true }
    );
    res.status(200).json(analytics);
  } catch (error) {
    res.status(400).json({ message: "Error updating analytics", error: error.message });
  }
});

export default router;
