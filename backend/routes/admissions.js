import express from 'express';
import Admission from '../models/Admission.js';

const router = express.Router();

// Get all admissions
router.get('/', async (req, res) => {
  try {
    const admissions = await Admission.find().sort({ submittedAt: -1 });
    res.status(200).json(admissions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admissions', error });
  }
});

// Get admission by ID
router.get('/:id', async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id);
    if (!admission) {
      return res.status(404).json({ message: 'Admission not found' });
    }
    res.status(200).json(admission);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admission', error });
  }
});

// Create new admission
router.post('/', async (req, res) => {
  try {
    // Check if email already exists
    const existingAdmission = await Admission.findOne({ email: req.body.email });
    if (existingAdmission) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Check if studentId already exists
    const existingStudentId = await Admission.findOne({ studentId: req.body.studentId });
    if (existingStudentId) {
      return res.status(400).json({ message: 'Student ID already exists' });
    }

    const newAdmission = new Admission({
      studentId: req.body.studentId,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      course: req.body.course,
      department: req.body.department,
      semester: req.body.semester,
      status: req.body.status || 'pending',
      submittedAt: req.body.submittedAt || new Date(),
      previousSchool: req.body.previousSchool,
      gpa: req.body.gpa
    });

    const savedAdmission = await newAdmission.save();
    res.status(201).json(savedAdmission);
  } catch (error) {
    // Log the full error for debugging
    console.error('Admission creation error:', error);
    
    res.status(400).json({ 
      message: 'Error creating admission', 
      error: error.message,
      details: error.errors ? Object.keys(error.errors).map(key => ({
        field: key,
        message: error.errors[key].message
      })) : null
    });
  }
});

// Update admission status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const updatedAdmission = await Admission.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedAdmission) {
      return res.status(404).json({ message: 'Admission not found' });
    }

    res.status(200).json(updatedAdmission);
  } catch (error) {
    res.status(500).json({ message: 'Error updating admission status', error });
  }
});

// Update admission details
router.put('/:id', async (req, res) => {
  try {
    const updatedAdmission = await Admission.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedAdmission) {
      return res.status(404).json({ message: 'Admission not found' });
    }

    res.status(200).json(updatedAdmission);
  } catch (error) {
    res.status(400).json({ message: 'Error updating admission', error });
  }
});

// Delete admission
router.delete('/:id', async (req, res) => {
  try {
    const deletedAdmission = await Admission.findByIdAndDelete(req.params.id);
    if (!deletedAdmission) {
      return res.status(404).json({ message: 'Admission not found' });
    }
    res.status(200).json({ message: 'Admission deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting admission', error });
  }
});

// Get admissions by status
router.get('/status/:status', async (req, res) => {
  try {
    const { status } = req.params;
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const admissions = await Admission.find({ status }).sort({ submittedAt: -1 });
    res.status(200).json(admissions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admissions', error });
  }
});

// Get admissions by department
router.get('/department/:department', async (req, res) => {
  try {
    const admissions = await Admission.find({ 
      department: req.params.department 
    }).sort({ submittedAt: -1 });
    res.status(200).json(admissions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admissions', error });
  }
});

// Get admissions statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const stats = await Admission.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          averageGPA: { $avg: { $toDouble: '$gpa' } }
        }
      }
    ]);

    const departmentStats = await Admission.aggregate([
      {
        $group: {
          _id: '$department',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      statusStats: stats,
      departmentStats
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admission statistics', error });
  }
});

export default router; 