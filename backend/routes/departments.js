import express from "express";
import Department from "../models/Department.js";

const router = express.Router();

// Get all departments
router.get("/", async (req, res) => {
  try {
    const departments = await Department.find().sort({ name: 1 });
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching departments", error: error.message });
  }
});

// Get department by ID
router.get("/:id", async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ message: "Error fetching department", error: error.message });
  }
});

// Create new department
router.post("/", async (req, res) => {
  try {
    const { name, description, totalStudents, totalTeachers } = req.body;

    // Check if department already exists
    const existingDepartment = await Department.findOne({ name });
    if (existingDepartment) {
      return res.status(400).json({ message: "Department already exists" });
    }

    const newDepartment = new Department({
      name,
      description,
      totalStudents,
      totalTeachers
    });

    const savedDepartment = await newDepartment.save();
    res.status(201).json(savedDepartment);
  } catch (error) {
    res.status(400).json({ message: "Error creating department", error: error.message });
  }
});

// Update department
router.put("/:id", async (req, res) => {
  try {
    const updatedDepartment = await Department.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedDepartment) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json(updatedDepartment);
  } catch (error) {
    res.status(400).json({ message: "Error updating department", error: error.message });
  }
});

// Delete department
router.delete("/:id", async (req, res) => {
  try {
    const deletedDepartment = await Department.findByIdAndDelete(req.params.id);
    if (!deletedDepartment) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting department", error: error.message });
  }
});

// Update department statistics
router.patch("/:id/stats", async (req, res) => {
  try {
    const { totalStudents, totalTeachers } = req.body;
    
    const updatedDepartment = await Department.findByIdAndUpdate(
      req.params.id,
      { totalStudents, totalTeachers },
      { new: true }
    );

    if (!updatedDepartment) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json(updatedDepartment);
  } catch (error) {
    res.status(400).json({ message: "Error updating department statistics", error: error.message });
  }
});

// Get department statistics
router.get("/stats/summary", async (req, res) => {
  try {
    const stats = await Department.aggregate([
      {
        $group: {
          _id: null,
          totalDepartments: { $sum: 1 },
          totalStudentsAll: { $sum: "$totalStudents" },
          totalTeachersAll: { $sum: "$totalTeachers" },
          avgStudentsPerDepartment: { $avg: "$totalStudents" },
          avgTeachersPerDepartment: { $avg: "$totalTeachers" }
        }
      }
    ]);

    const departmentSizes = await Department.aggregate([
      {
        $project: {
          name: 1,
          totalMembers: { $add: ["$totalStudents", "$totalTeachers"] }
        }
      },
      { $sort: { totalMembers: -1 } }
    ]);

    res.status(200).json({
      summary: stats[0],
      departmentSizes
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching department statistics", error: error.message });
  }
});

// Search departments
router.get("/search/:query", async (req, res) => {
  try {
    const searchQuery = new RegExp(req.params.query, 'i');
    const departments = await Department.find({
      $or: [
        { name: searchQuery },
        { description: searchQuery }
      ]
    });
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: "Error searching departments", error: error.message });
  }
});

export default router;

