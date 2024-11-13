import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  totalStudents: { type: Number, default: 0 },
  totalTeachers: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Department', departmentSchema); 