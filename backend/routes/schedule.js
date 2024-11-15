import express from 'express';
import Schedule from '../models/Schedule.js';

const router = express.Router();

// Get all classes with filters
router.get('/', async (req, res) => {
  try {
    const { department, semester } = req.query;
    let query = {};
    
    if (department) query.department = department;
    if (semester) query.semester = semester;

    const classes = await Schedule.find(query).sort({ day: 1, startTime: 1 });
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching schedule', 
      error: error.message 
    });
  }
});

// Add new class
router.post('/', async (req, res) => {
  try {
    // Check for time conflicts
    const conflictingClass = await Schedule.findOne({
      day: req.body.day,
      department: req.body.department,
      semester: req.body.semester,
      $or: [
        {
          startTime: { $lt: req.body.endTime },
          endTime: { $gt: req.body.startTime }
        }
      ]
    });

    if (conflictingClass) {
      return res.status(400).json({ 
        message: 'Time slot conflict with existing class' 
      });
    }

    const newClass = new Schedule(req.body);
    await newClass.save();
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error creating class', 
      error: error.message 
    });
  }
});

// Update class
router.put('/:id', async (req, res) => {
  try {
    const updatedClass = await Schedule.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.status(200).json(updatedClass);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error updating class', 
      error: error.message 
    });
  }
});

// Delete class
router.delete('/:id', async (req, res) => {
  try {
    const deletedClass = await Schedule.findByIdAndDelete(req.params.id);
    if (!deletedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.status(200).json({ message: 'Class deleted successfully' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error deleting class', 
      error: error.message 
    });
  }
});

export default router; 