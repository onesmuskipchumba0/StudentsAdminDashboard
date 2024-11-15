import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema({
  studentId: { 
    type: String, 
    required: true,
    ref: 'Student' // Reference to Student model
  },
  studentName: { 
    type: String, 
    required: true 
  },
  course: { 
    type: String, 
    required: true,
    enum: ['Web Development', 'Data Science', 'Mobile Development', 'UI/UX Design']
  },
  assignment: { 
    type: String, 
    required: true 
  },
  grade: { 
    type: String, 
    required: true,
    enum: ['A', 'B', 'C', 'D', 'F']
  },
  submissionDate: { 
    type: Date, 
    required: true 
  },
  semester: {
    type: String,
    required: true,
    enum: ['Fall 2024', 'Spring 2024', 'Summer 2024']
  },
  notes: {
    type: String
  },
  department: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  lastModifiedBy: {
    type: String,
    required: true
  }
}, { 
  timestamps: true 
});

// Add indexes for common queries
gradeSchema.index({ studentId: 1, course: 1 });
gradeSchema.index({ grade: 1 });
gradeSchema.index({ submissionDate: 1 });

export default mongoose.model('Grade', gradeSchema); 