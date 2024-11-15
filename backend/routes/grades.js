import express from "express";
import Grade from "../models/Grade.js";
const router = express.Router();

// Get all grades with filters
router.get("/", async (req, res) => {
  try {
    const { 
      studentId, 
      course, 
      grade, 
      semester,
      department,
      year,
      startDate,
      endDate 
    } = req.query;

    let query = {};
    
    if (studentId) query.studentId = studentId;
    if (course) query.course = course;
    if (grade) query.grade = grade;
    if (semester) query.semester = semester;
    if (department) query.department = department;
    if (year) query.year = year;
    
    if (startDate || endDate) {
      query.submissionDate = {};
      if (startDate) query.submissionDate.$gte = new Date(startDate);
      if (endDate) query.submissionDate.$lte = new Date(endDate);
    }

    const grades = await Grade.find(query)
      .sort({ submissionDate: -1 })
      .limit(parseInt(req.query.limit) || 100);

    res.status(200).json(grades);
  } catch (error) {
    res.status(500).json({ 
      message: "Error fetching grades", 
      error: error.message 
    });
  }
});

// Create new grade
router.post("/", async (req, res) => {
  try {
    const newGrade = new Grade({
      ...req.body,
      createdBy: req.body.createdBy || 'system',
      lastModifiedBy: req.body.lastModifiedBy || 'system'
    });

    const savedGrade = await newGrade.save();
    res.status(201).json(savedGrade);
  } catch (error) {
    res.status(400).json({ 
      message: "Error creating grade", 
      error: error.message 
    });
  }
});

// Update grade
router.put("/:id", async (req, res) => {
  try {
    const updatedGrade = await Grade.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        lastModifiedBy: req.body.lastModifiedBy || 'system'
      },
      { new: true, runValidators: true }
    );

    if (!updatedGrade) {
      return res.status(404).json({ message: "Grade not found" });
    }

    res.status(200).json(updatedGrade);
  } catch (error) {
    res.status(400).json({ 
      message: "Error updating grade", 
      error: error.message 
    });
  }
});

// Delete grade
router.delete("/:id", async (req, res) => {
  try {
    const deletedGrade = await Grade.findByIdAndDelete(req.params.id);
    if (!deletedGrade) {
      return res.status(404).json({ message: "Grade not found" });
    }
    res.status(200).json({ message: "Grade deleted successfully" });
  } catch (error) {
    res.status(500).json({ 
      message: "Error deleting grade", 
      error: error.message 
    });
  }
});

// Get grade statistics
router.get("/stats", async (req, res) => {
  try {
    const { department, year, semester } = req.query;
    let matchQuery = {};
    
    if (department) matchQuery.department = department;
    if (year) matchQuery.year = year;
    if (semester) matchQuery.semester = semester;

    const gradeDistribution = await Grade.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: "$grade",
          students: { $sum: 1 }
        }
      },
      {
        $project: {
          grade: "$_id",
          students: 1,
          _id: 0
        }
      },
      { $sort: { grade: 1 } }
    ]);

    const coursePerformance = await Grade.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: {
            course: "$course",
            grade: "$grade"
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: "$_id.course",
          grades: {
            $push: {
              grade: "$_id.grade",
              count: "$count"
            }
          },
          totalStudents: { $sum: "$count" }
        }
      }
    ]);

    res.status(200).json({
      gradeDistribution,
      coursePerformance
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error fetching grade statistics", 
      error: error.message 
    });
  }
});

// Export grades report
router.get("/export", async (req, res) => {
  try {
    const { format = 'csv' } = req.query;
    const grades = await Grade.find({})
      .sort({ submissionDate: -1 })
      .select('-__v -createdAt -updatedAt');

    if (format === 'csv') {
      // Implement CSV export
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=grades.csv');
      // Convert grades to CSV format and send
    } else if (format === 'pdf') {
      // Implement PDF export
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=grades.pdf');
      // Generate PDF and send
    } else {
      res.status(400).json({ message: "Unsupported export format" });
    }
  } catch (error) {
    res.status(500).json({ 
      message: "Error exporting grades", 
      error: error.message 
    });
  }
});

export default router; 