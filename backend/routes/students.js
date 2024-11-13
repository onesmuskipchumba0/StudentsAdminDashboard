import express from "express";
import Student from "../models/Student.js";
import Admission from "../models/Admission.js";
const router = express.Router();

// Get all students with optional filters
router.get("/", async (req, res) => {
  try {
    const { status, course, attendance } = req.query;
    let query = {};

    if (status) query.status = status;
    if (course) query.course = course;
    if (attendance) query.attendance = attendance;

    const students = await Student.find(query).sort({ enrollmentDate: -1 });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error: error.message });
  }
});

// Get student by ID
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Error fetching student", error: error.message });
  }
});

// Create new student
router.post("/", async (req, res) => {
    const studentId = await Admission.findOne({ email: req.body.email });
    if (!studentId) {
        return res.status(404).json({ message: "Student with this email not found" });
    }
  try {
    const newStudent = new Student({
      studentId: (studentId)?.studentId || Math.floor(Math.random() * 1000000),
      name: req.body.name,
      email: req.body.email,
      course: req.body.course,
      enrollmentDate: req.body.enrollmentDate,
      status: req.body.status,
      attendance: req.body.attendance,
      grade: req.body.grade
    });

    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ message: "Error creating student", error: error.message });
  }
});

// Update student
router.put("/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: "Error updating student", error: error.message });
  }
});

// Delete student
router.delete("/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student", error: error.message });
  }
});

// Update student attendance
router.patch("/:id/attendance", async (req, res) => {
  try {
    const { attendance } = req.body;
    if (!['present', 'absent'].includes(attendance)) {
      return res.status(400).json({ message: "Invalid attendance value" });
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { attendance },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: "Error updating attendance", error: error.message });
  }
});

// Update student grade
router.patch("/:id/grade", async (req, res) => {
  try {
    const { grade } = req.body;
    if (!grade.assignment || !grade.grade || !grade.submissionDate) {
      return res.status(400).json({ message: "Invalid grade data" });
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { grade },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: "Error updating grade", error: error.message });
  }
});

// Get students by course
router.get("/course/:courseName", async (req, res) => {
  try {
    const students = await Student.find({ 
      course: req.params.courseName 
    }).sort({ name: 1 });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error: error.message });
  }
});

// Get student statistics
router.get("/stats/summary", async (req, res) => {
  try {
    const stats = await Student.aggregate([
      {
        $group: {
          _id: null,
          totalStudents: { $sum: 1 },
          activeStudents: {
            $sum: { $cond: [{ $eq: ["$status", "Active"] }, 1, 0] }
          },
          presentToday: {
            $sum: { $cond: [{ $eq: ["$attendance", "present"] }, 1, 0] }
          }
        }
      }
    ]);

    const courseDistribution = await Student.aggregate([
      {
        $group: {
          _id: "$course",
          count: { $sum: 1 }
        }
      }
    ]);

    const statusDistribution = await Student.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      summary: stats[0],
      courseDistribution,
      statusDistribution
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching statistics", error: error.message });
  }
});

export default router;
