import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  studentId: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  course: { type: String, required: true },
  enrollmentDate: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['Active', 'Inactive', 'Suspended'],
    default: 'Active'
  },
  attendance: { 
    type: String,
    enum: ['present', 'absent'],
    required: true 
  },
  grade: {
    assignment: { type: String, required: true },
    grade: { type: String, required: true },
    submissionDate: { type: Date, required: true }
  }
}, { timestamps: true });

export default mongoose.model('Student', studentSchema); 