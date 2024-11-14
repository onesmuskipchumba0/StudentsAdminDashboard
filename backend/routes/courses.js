import express from "express";
import Course from "../models/Course.js";

const router = express.Router();

// Get all courses with filters
router.get("/", async (req, res) => {
  try {
    const { status, instructor } = req.query;
    let query = {};

    if (status) query.status = status;
    if (instructor) query.instructor = instructor;

    const courses = await Course.find(query).sort({ startDate: 1 });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error: error.message });
  }
});

// Get course by ID
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Error fetching course", error: error.message });
  }
});

// Create new course
router.post("/", async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(400).json({ message: "Error creating course", error: error.message });
  }
});

// Update course
router.put("/:id", async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(400).json({ message: "Error updating course", error: error.message });
  }
});

// Delete course
router.delete("/:id", async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting course", error: error.message });
  }
});

// Update course progress
router.patch("/:id/progress", async (req, res) => {
  try {
    const { progress } = req.body;
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.progress = progress;
    await course.save();
    
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ message: "Error updating progress", error: error.message });
  }
});

// Enroll student in course
router.patch("/:id/enroll", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.enrolledStudents >= course.maxStudents) {
      return res.status(400).json({ message: "Course is full" });
    }

    course.enrolledStudents += 1;
    await course.save();
    
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ message: "Error enrolling in course", error: error.message });
  }
});

// Get active courses
router.get("/status/active", async (req, res) => {
  try {
    const courses = await Course.find({ status: "Active" })
      .sort({ startDate: 1 });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching active courses", error: error.message });
  }
});

// Get upcoming courses
router.get("/status/upcoming", async (req, res) => {
  try {
    const courses = await Course.find({ status: "Upcoming" })
      .sort({ startDate: 1 });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching upcoming courses", error: error.message });
  }
});

export default router;
