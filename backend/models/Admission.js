import mongoose from 'mongoose';


const admissionSchema = new mongoose.Schema({
  studentId: { type: Number, required: true, unique: true },
  studentName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  department: { type: String, required: true },
  semester: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  submittedAt: { type: Date, default: Date.now },
  previousSchool: { type: String, required: true },
  gpa: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Admission', admissionSchema); 